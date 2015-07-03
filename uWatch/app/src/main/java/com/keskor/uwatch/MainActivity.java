package com.example.keskor.uwatch;


import android.content.Intent;
import android.graphics.Color;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;


public class MainActivity extends ActionBarActivity {
    int numberOfLoginAttempts = 3;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        login(setContentView(R.layout.activity_main));
        Button registerButton = (Button) findViewById(R.id.registerbtn);
        // Listening to register new account link
        registerButton.setOnClickListener(new View.OnClickListener() {

            public void onClick(View v) {
                // Switching to Register screen
                Intent i = new Intent(getApplicationContext(), com.example.keskor.uwatch.Register.class);
                startActivity(i);
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
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


    EditText username = (EditText)findViewById(R.id.editText2);
    EditText password = (EditText)findViewById(R.id.editText);
    Button login = (Button)findViewById(R.id.button);
    TextView loginLockedTV = (TextView)findViewById(R.id.loginLockedTV);
    TextView attemptsLeftTV = (TextView)findViewById(R.id.attemptsLeftTV);
    TextView numberOfRemainingLoginAttemptsTV = (TextView) findViewById(R.id.numberOfRemainingLoginAttemptsTV);

    public void login(View view)
    {
        if (username.getText().toString().equals("admin")&&
        password.getText().toString().equals("admin"))
        {
        Toast.makeText(getApplicationContext(), "Hello admin!",
                Toast.LENGTH_SHORT).show();
    } else
        {
        Toast.makeText(getApplicationContext(), "Incorrect login!",
                Toast.LENGTH_SHORT).show();
        numberOfLoginAttempts--;
        attemptsLeftTV.setVisibility(View.VISIBLE);
        numberOfRemainingLoginAttemptsTV.setVisibility(View.VISIBLE);
        numberOfRemainingLoginAttemptsTV.setText(Integer.toString(numberOfLoginAttempts));
        if (numberOfLoginAttempts == 0) {
            login.setEnabled(false);
            loginLockedTV.setVisibility(View.VISIBLE);
            loginLockedTV.setBackgroundColor(Color.RED);
            loginLockedTV.setText("LOGIN LOCKED!!!");
        }
    }
    }
}
