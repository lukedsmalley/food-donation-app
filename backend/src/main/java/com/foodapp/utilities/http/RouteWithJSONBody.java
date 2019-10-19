package com.foodapp.utilities.http;

import com.foodapp.utilities.Utilities;

import static com.foodapp.utilities.http.HTTPResponse.status;

public abstract class RouteWithJSONBody<T> extends Route {
    private Class<T> bodyType;

    protected RouteWithJSONBody(Class<T> bodyType) {
        this.bodyType = bodyType;
    }

    protected abstract HTTPResponse<String> getResponse(T body, HTTPRequest request) throws Exception;

    @Override
    protected HTTPResponse<String> getResponse(HTTPRequest request) throws Exception {
        T body;
        try {
            body = Utilities.deserializeJSON(request.body, bodyType);
        } catch (Exception ex) {
            return status(400);
        }
        return getResponse(body, request);
    }
}
