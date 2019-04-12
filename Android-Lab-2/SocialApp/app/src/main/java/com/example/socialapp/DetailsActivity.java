package com.example.socialapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.login.LoginManager;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

public class DetailsActivity extends AppCompatActivity {
    private FirebaseAuth mAuth;
    private Button logoutBtn;
    String name;
    //String data = "Name: Dwarkamoye Mohanty"+"/n"+"Email : mdwarkamoye@gmail.com"+"/n"+"Birthday:24/12/1994";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_details);
        // Initialize Firebase Auth
        mAuth = FirebaseAuth.getInstance();
        Bundle extras = getIntent().getExtras();
        TextView textview = (TextView)findViewById(R.id.textView);
        //LinearLayout linearLayout= (LinearLayout)findViewById(R.id.textView);
        if (extras != null) {
           // name = extras.getString("name") +"/n"+ data;
            name = extras.getString("name").replace( '{', ' ' ).replace('}',' ');
            textview.setText(name);
        }
        logoutBtn = (Button) findViewById(R.id.logoutbutton);
        logoutBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
              mAuth.signOut();
              LoginManager.getInstance().logOut();
                updateUI();
            }
        });
    }
    @Override
    public void onStart() {
        super.onStart();
        // Check if user is signed in (non-null) and update UI accordingly.
        FirebaseUser currentUser = mAuth.getCurrentUser();
        if(currentUser == null){updateUI();}
    }
    private void updateUI(){
        Toast.makeText(DetailsActivity.this,"You are logged out",Toast.LENGTH_LONG).show();
        Intent goint = new Intent(DetailsActivity.this,MainActivity.class);
        startActivity(goint);
        finish();
    }
}
