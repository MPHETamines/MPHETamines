package com.keskor.uwatch;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

/**
 * Created by Martina on 7/7/2015.
 */
public class DatabaseHandler extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = "uWatch";
    private static final int DATABASE_VERSION = 1;

    private  static final String TABLE_USERS = "Users";

    private static final String NAME = "Name";
    private static final String SURNAME ="Surname";
    private static final String USERNAME = "Username";
    private static final String EMAIL = "Email";
    private static final String PASSWORD = "Password";

    public DatabaseHandler(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }
    @Override
    public void onCreate(SQLiteDatabase db) {
        // Construct a table for Users
        String CREATE_USER_TABLE = "CREATE TABLE " + TABLE_USERS  + "("
                + USERNAME + " VARCHAR(20) PRIMARY KEY," + PASSWORD + " VARCHAR(20),"
                + NAME + " VARCHAR(20),"+ SURNAME + "VARCHAR(20),"+ EMAIL + "VARCHAR(20)" +")";
        db.execSQL(CREATE_USER_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        if (newVersion == 1) {
            // Wipe older tables if existed
            db.execSQL("DROP TABLE IF EXISTS " + TABLE_USERS);
            // Create tables again
            onCreate(db);
        }
    }

    public void addToUsers(Users user)
    {
        // This opens the database connection
        SQLiteDatabase db = this.getWritableDatabase();

        //Defines the values for each field
        ContentValues values = new ContentValues();
        values.put(USERNAME,user.getUsername());
        values.put(PASSWORD,user.getPassword());
        values.put(NAME,user.getName());
        values.put(SURNAME,user.getSurname());
        values.put(EMAIL,user.getEmail());

        //insert the row and get the generated id
        long rowID = db.insertOrThrow(TABLE_USERS,null,values);

        //close the database connection
        db.close();

    }
}
