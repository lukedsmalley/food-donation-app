package com.foodapp;

import com.foodapp.authorization.*;
import com.foodapp.utilities.http.HTMLTemplateRoute;
import com.foodapp.utilities.http.HTTPRequest;
import com.foodapp.utilities.http.HTTPResponse;
import com.foodapp.utilities.http.Route;
import com.foodapp.utilities.sql.Database;
import com.foodapp.utilities.sql.Table;
import org.slf4j.Logger;
import spark.Request;
import spark.Response;
import spark.Spark;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static com.foodapp.utilities.http.HTTPResponse.status;
import static org.slf4j.LoggerFactory.getLogger;
import static spark.Spark.*;

public class Main {
    @FunctionalInterface
    interface RouteRegistrationMethod {
        void bind(String path, spark.Route route);
    }

    private static void route(RouteRegistrationMethod method, Route route, String... paths) {
        Arrays.stream(paths).forEach(path -> method.bind(path, (request, response) -> route.handle(new HTTPRequest(request)).apply(response)));
    }

    @FunctionalInterface
    interface RouteSupplier {
        Route get(Request request, Response response);
    }

    private static void route(RouteRegistrationMethod method, RouteSupplier supplier, String... paths) {
        Arrays.stream(paths).forEach(path -> method.bind(path, (request, response) -> {
            Route route = supplier.get(request, response);
            if (route != null) return route.handle(new HTTPRequest(request)).apply(response);
            else return status(404).apply(response);
        }));
    }

    @FunctionalInterface
    interface FilterRegistrationMethod {
        void bind(String path, spark.Filter route);
    }

    private static void filter(FilterRegistrationMethod method, Route route, String... paths) {
        Arrays.stream(paths).forEach(path -> method.bind(path, (request, response) -> {
            HTTPResponse handlerResponse = route.handle(new HTTPRequest(request));
            if (handlerResponse != null) halt(handlerResponse.status, handlerResponse.content != null ? handlerResponse.content.toString() : "");
        }));
    }

    private static void alias(String redirect, String... paths) {
        Arrays.stream(paths).forEach(path -> Spark.get(path, (request, response) -> {
            response.redirect(redirect);
            return "";
        }));
    }

    public static void main(String[] args) {
        Logger logger = getLogger(Main.class);

        logger.info("Loading configuration");
        Configuration configuration;
        try {
            configuration = Configuration.load();
        } catch (Exception ex) {
            logger.error("Failed to load configuration", ex);
            return;
        }

        logger.info("Configuring database");
        Database database;
        try {
            database = Database.connect(configuration.databaseURL, configuration.databaseUsername, configuration.databasePassword);
        } catch (Exception ex) {
            logger.error("Failed to configure database", ex);
            return;
        }

        Table<Account> accounts = database.getTable("accounts", Account.class);
        Map<String, Session> sessions = new HashMap<>();

        logger.info("Configuring HTTP server");
        port(8080);
        externalStaticFileLocation("public");

        alias("/home", "/");
        route(Spark::get, new PatientAccountCreationRoute(accounts), "/api/create-account");
        route(Spark::post, new AuthorizationRoute(accounts, sessions), "/api/authorize");
        alias("/portal/dashboard", "/portal");
        alias("/admin/dashboard", "/admin");
        filter(Spark::before, new AuthenticationFilter(sessions), "/portal/*", "/admin/*");
        filter(Spark::before, new PatientAuthenticationFilter(sessions), "/portal/*");
        route(Spark::get, (request, response) -> HTMLTemplateRoute.withoutContext(request.params("view") + ".html"), "/:view");
        //API routes go at the end
    }
}
