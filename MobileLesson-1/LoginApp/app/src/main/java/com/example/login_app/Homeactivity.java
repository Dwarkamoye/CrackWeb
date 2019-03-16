package com.example.login_app;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class Homeactivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.home);
    }

    public void homeclick(View v) {
        Intent redirect = new Intent(Homeactivity.this, MainActivity.class);
            startActivity(redirect);
    }
}