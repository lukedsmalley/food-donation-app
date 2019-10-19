package com.foodapp.utilities.http;

import com.foodapp.utilities.Utilities;

public abstract class JSONRoute extends Route {
    protected abstract HTTPResponse getObject(HTTPRequest request) throws Exception;

    @Override
    protected HTTPResponse<String> getResponse(HTTPRequest request) throws Exception {
        HTTPResponse response = getObject(request);
        return new HTTPResponse<>(response.status, Utilities.serializeJSON(response.content), "application/json");
    }
}
