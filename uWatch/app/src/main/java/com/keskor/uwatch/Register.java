package com.keskor.uwatch;



import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;



public class Register extends ActionBarActivity {

    EditText editTextFirstName;
    EditText editTextLastName;
    EditText editTextEmail;
    EditText editTextUserName;
    EditText editTextPassword;
    DatabaseHandler databaseHandler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);


        databaseHandler = new DatabaseHandler(this);

        editTextFirstName =(EditText)findViewById(R.id.fname);
        editTextLastName =(EditText)findViewById(R.id.lname);
        editTextEmail = (EditText)findViewById(R.id.email);
        editTextUserName=(EditText)findViewById(R.id.uname);
        editTextPassword=(EditText)findViewById(R.id.pword);

        Button btnCreateAccount=(Button)findViewById(R.id.register);

        // create a new user account
        btnCreateAccount.setOnClickListener(new View.OnClickListener() {

            public void onClick(View v) {


                String fname = editTextFirstName.getText().toString();
                String lname = editTextLastName.getText().toString();
                String uname = editTextUserName.getText().toString();
                String email = editTextEmail.getText().toString();
                String pass = editTextPassword.getText().toString();


                if(fname.equals("") || lname.equals("") || uname.equals("") || email.equals("") || pass.equals("")) {
                    Toast.makeText(getApplicationContext(), "Fill in the fields", Toast.LENGTH_LONG).show();
                    return;
                }
                else {

                    //insert into the database and go to successfully registered screen
                    databaseHandler.addToUsers(new Users(fname,lname,uname,email,pass));
                    Intent i = new Intent(getApplicationContext(), com.keskor.uwatch.registered.class);
                    startActivity(i);
                }
            }
        });

        Button loginScreen = (Button) findViewById(R.id.bktologin);

        // Listening to Login Screen link
        loginScreen.setOnClickListener(new View.OnClickListener() {

            public void onClick(View arg0) {
                // Closing registration screen
                // Switching to Login Screen/closing register screen
                Intent i = new Intent(getApplicationContext(), com.keskor.uwatch.MainActivity.class);
                startActivity(i);
                finish();
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        //getMenuInflater().inflate(R.menu.menu_register, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

}
