package com.example.coffeeapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Toast;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

public class Homeactivity extends AppCompatActivity {

    private EditText name;
    private EditText quantity;
    private boolean ischocolate;
    private boolean ishazelnut;
    private boolean ischocochip;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.home);
    }

    public void summary(View v) {
        EditText name = (EditText) findViewById(R.id.name);
        EditText quantity = (EditText) findViewById(R.id.number);
        boolean ischocolate = ((CheckBox) findViewById(R.id.checkBox1)).isChecked();
        boolean ishazelnut = ((CheckBox) findViewById(R.id.checkBox2)).isChecked();
        boolean ischocochip = ((CheckBox) findViewById(R.id.checkBox3)).isChecked();
        Object objData = storeData(name,quantity,ischocolate,ishazelnut,ischocochip);
        Intent intent = new Intent(Homeactivity.this, SummaryActivity.class);
        intent.putExtra("name", name.getText().toString());
        intent.putExtra("quantity", quantity.getText().toString());
        intent.putExtra("ischocolate", ischocolate);
        intent.putExtra("ishazelnut", ishazelnut);
        intent.putExtra("ischocochip", ischocochip);
        startActivity(intent);
    }
    public void order(View v) {
        String txt = createOrderSummary(name.getText().toString(),quantity.getText().toString(),ischocolate,ischocochip,ishazelnut);
        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.setType("plain/text");
        intent.putExtra(android.content.Intent.EXTRA_EMAIL, new String[] {"coffeeorder@gmail.com"});
        intent.putExtra(android.content.Intent.EXTRA_SUBJECT,"Order Summary");
        intent.putExtra(android.content.Intent.EXTRA_TEXT, txt);
        startActivity(Intent.createChooser(intent,""));

    }
    public Object storeData(EditText name,EditText quantity,boolean ischocolate,boolean ishazelnut,boolean ischocochip)
    {
        this.name = name;
        this.quantity = quantity;
        this.ischocolate = ischocolate;
        this.ishazelnut = ishazelnut;
        this.ischocochip = ischocochip;
        return this;
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
