package com.foodapp.authorization;

import com.foodapp.utilities.Utilities;
import com.foodapp.utilities.http.HTTPRequest;
import com.foodapp.utilities.http.HTTPResponse;
import com.foodapp.utilities.http.RouteWithJSONBody;
import com.foodapp.utilities.sql.Table;

import static com.foodapp.utilities.Utilities.getSHA;
import static com.foodapp.utilities.http.HTTPResponse.redirect;
import static com.foodapp.utilities.http.HTTPResponse.status;

public class PatientAccountCreationRoute extends RouteWithJSONBody<PatientAccountCreationBody> {
    private Table<Account> accounts;

    public PatientAccountCreationRoute(Table<Account> accounts) {
        super(PatientAccountCreationBody.class);
        this.accounts = accounts;
    }

    @Override
    protected HTTPResponse<String> getResponse(PatientAccountCreationBody body, HTTPRequest request) throws Exception {
        if (body.username == null
                || body.email == null
                || body.password == null
                || accounts.countWhere("username", body.username) > 0)
            return status(400);
        accounts.insert(new Account(body.username, body.email, getSHA(body.password), Account.Type.PATIENT));
        return redirect("/account-creation-succeeded");
    }
}