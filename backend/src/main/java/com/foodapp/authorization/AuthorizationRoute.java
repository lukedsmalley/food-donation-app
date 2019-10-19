package com.foodapp.authorization;

import com.foodapp.utilities.Utilities;
import com.foodapp.utilities.http.HTTPRequest;
import com.foodapp.utilities.http.HTTPResponse;
import com.foodapp.utilities.http.RouteWithJSONBody;
import com.foodapp.utilities.sql.Table;

import java.util.Map;

import static com.foodapp.utilities.Utilities.getSHA;
import static com.foodapp.utilities.http.HTTPResponse.redirect;
import static com.foodapp.utilities.http.HTTPResponse.status;

public class AuthorizationRoute extends RouteWithJSONBody<AuthorizationBody> {
    private Table<Account> accounts;
    private Map<String, Session> sessions;

    public AuthorizationRoute(Table<Account> accounts, Map<String, Session> sessions) {
        super(AuthorizationBody.class);
        this.accounts = accounts;
        this.sessions = sessions;
    }

    @Override
    protected HTTPResponse<String> getResponse(AuthorizationBody body, HTTPRequest request) throws Exception {
        if (body.username == null) return status(400);
        if (body.password == null) return status(400);
        Account account;
        try {
            account = accounts.selectFirstWhere("username", body.username);
        } catch (Exception ex) {
            return status(403);
        }
        if (!getSHA(body.password).equals(account.passwordHash)) return status(403);
        String token = Long.toHexString(Utilities.getNextUID());
        sessions.put(token, new Session(System.currentTimeMillis(), account.id, account.type));
        return redirect("/patient/dashboard").withSession(token);
    }
}