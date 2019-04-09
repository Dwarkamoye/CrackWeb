package com.example.socialapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class Emailsignin extends AppCompatActivity {
    private Button signinBtn;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.email);
        signinBtn = (Button) findViewById(R.id.signin);
        signinBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(Emailsignin.this,"Sucessfully signed in",Toast.LENGTH_LONG).show();

                Intent goint = new Intent(Emailsignin.this,DetailsActivity.class);
                startActivity(goint);
                finish();
            }
        });
    }
}
