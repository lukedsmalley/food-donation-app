package com.foodapp.utilities.http;

import static com.foodapp.utilities.http.HTTPResponse.status;

public abstract class Route {
    protected abstract HTTPResponse<String> getResponse(HTTPRequest request) throws Exception;

    public HTTPResponse<String> handle(HTTPRequest request) {
        try {
            HTTPResponse<String> response = getResponse(request);
            return response == null ? status(404) : response;
        } catch (Exception ex) {
            return status(500);
        }
    }
}
