package com.foodapp.authorization;

public class Session {
    public final long created;
    public final long accountID;
    public final Account.Type type;

    public Session(long created, long accountID, Account.Type type) {
        this.created = created;
        this.accountID = accountID;
        this.type = type;
    }
}
