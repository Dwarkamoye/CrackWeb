package com.example.coffeeapp;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

public class SummaryActivity extends AppCompatActivity {
    LinearLayout linearLayout;
    String name,quantity;
    Boolean ischocolate,ishazelnut,ischocochip;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.summary);
        Bundle extras = getIntent().getExtras();
        LinearLayout linearLayout= (LinearLayout)findViewById(R.id.summarytxt);
        if (extras != null) {
            name = extras.getString("name");
            quantity = extras.getString("quantity");
            ischocolate = extras.getBoolean("ischocolate");
            ishazelnut = extras.getBoolean("ishazelnut");
            ischocochip = extras.getBoolean("ischocochip");
            TextView textView = new TextView(this);
            String txt = createOrderSummary(name,quantity,ischocochip,ischocolate,ishazelnut);
            textView.setText(txt);
            textView.setTextSize(15);
            textView.setGravity(Gravity.LEFT);
            linearLayout.addView(textView);
        }
    }
    public void gotoorder(View v) {
        Intent intent = new Intent(SummaryActivity.this, Homeactivity.class);
        startActivity(intent);
    }
    private String createOrderSummary(String userInputName, String quantity, boolean ischocochip, boolean ischocolate, boolean ishazelnut) {
        String ingredients = "";
        if(ischocochip){
            ingredients+= "Chocochip ";
        }
        if(ischocolate){
            ingredients+= "Chocolate ";
        }
        if(ishazelnut){
            ingredients+= "Hazelnut ";
        }
        String orderSummaryMessage = getString(R.string.order_summary_name,userInputName) +"\n\n"+
                getString(R.string.order_summary_ingredient,ingredients)+"\n\n"+
                getString(R.string.order_summary_quantity,quantity)+"\n\n"+
                getString(R.string.order_summary_total_price,32) +"\n\n\n"+
                getString(R.string.thank_you);
        return orderSummaryMessage;

    }

}
