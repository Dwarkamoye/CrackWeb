package com.example.coffeeapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.content.Intent;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.start);
    }

        boolean validate = false;
        public void register(View v) {
            Intent redirect = new Intent(MainActivity.this, Loginactivity.class);
            startActivity(redirect);
           /* EditText username = (EditText) findViewById(R.id.username);
            EditText password = (EditText) findViewById(R.id.password);
           if(username.getText().toString().equals("admin") && password.getText().toString().equals("admin")){
                Toast.makeText(getApplicationContext(), "Successfull Login", Toast.LENGTH_SHORT).show();
                 validate = true;
                Intent redirect = new Intent(MainActivity.this, Homeactivity.class);
                startActivity(redirect);
            }
            else{
               Toast.makeText(getApplicationContext(), "Umsuccessfull Login", Toast.LENGTH_SHORT).show();
           }*/
          }
    public void guest(View v) {
        Intent redirect = new Intent(MainActivity.this, Homeactivity.class);
        startActivity(redirect);
           /* EditText username = (EditText) findViewById(R.id.username);
            EditText password = (EditText) findViewById(R.id.password);
           if(username.getText().toString().equals("admin") && password.getText().toString().equals("admin")){
                Toast.makeText(getApplicationContext(), "Successfull Login", Toast.LENGTH_SHORT).show();
                 validate = true;
                Intent redirect = new Intent(MainActivity.this, Homeactivity.class);
                startActivity(redirect);
            }
            else{
               Toast.makeText(getApplicationContext(), "Umsuccessfull Login", Toast.LENGTH_SHORT).show();
           }*/
    }
}
