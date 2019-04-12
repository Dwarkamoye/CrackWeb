package com.example.login_app;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

        boolean validate = false;
        public void loginclick(View v) {
            EditText username = (EditText) findViewById(R.id.username);
            EditText password = (EditText) findViewById(R.id.password);
           if(username.getText().toString().equals("admin") && password.getText().toString().equals("admin")){
                Toast.makeText(getApplicationContext(), "Successfull Login", Toast.LENGTH_SHORT).show();
                 validate = true;
                Intent redirect = new Intent(MainActivity.this, Homeactivity.class);
                startActivity(redirect);
            }
            else{
               Toast.makeText(getApplicationContext(), "Umsuccessfull Login", Toast.LENGTH_SHORT).show();
           }
          }
}
