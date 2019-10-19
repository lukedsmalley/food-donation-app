package com.foodapp.authorization;

import com.foodapp.utilities.Utilities;
import com.foodapp.utilities.sql.Column;
import com.foodapp.utilities.sql.PrimaryKey;
import com.foodapp.utilities.sql.Row;

public class Account extends Row {
    public enum Type {
        PATIENT, EMPLOYEE
    }

    public @PrimaryKey @Column("id") long id;
    public @Column("username") String username;
    public @Column("email") String email;
    public @Column("password_hash") String passwordHash;
    public @Column("type") Type type;

    public Account() { }

    public Account(String username, String email, String passwordHash, Type type) {
        this.id = Utilities.getNextUID();
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.type = type;
    }
}
