package com.foodapp.authorization;

import com.foodapp.utilities.http.HTTPRequest;
import com.foodapp.utilities.http.HTTPResponse;
import com.foodapp.utilities.http.Route;

import java.util.Map;

import static com.foodapp.utilities.http.HTTPResponse.status;

public class PatientAuthenticationFilter extends Route {
    private Map<String, Session> sessions;

    public PatientAuthenticationFilter(Map<String, Session> sessions) {
        this.sessions = sessions;
    }

    @Override
    protected HTTPResponse<String> getResponse(HTTPRequest request) throws Exception {
        if (sessions.get(request.sessionToken).type != Account.Type.PATIENT) return status(403);
        return null;
    }
}
