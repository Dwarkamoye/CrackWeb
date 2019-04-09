package com.example.socialapp;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class Loginactivity extends AppCompatActivity {
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);
    }
    boolean validate = false;
    public void login(View v) {
        EditText username = (EditText) findViewById(R.id.username);
        EditText password = (EditText) findViewById(R.id.password);
        if(username.getText().toString().equals("admin") && password.getText().toString().equals("admin")){
            Toast.makeText(getApplicationContext(), "Successfull Login", Toast.LENGTH_SHORT).show();
            validate = true;
            Intent redirect = new Intent(Loginactivity.this, DetailsActivity.class);
            startActivity(redirect);
        }
        else{
            Toast.makeText(getApplicationContext(), "Unsuccessfull Login", Toast.LENGTH_SHORT).show();
        }
    }
}