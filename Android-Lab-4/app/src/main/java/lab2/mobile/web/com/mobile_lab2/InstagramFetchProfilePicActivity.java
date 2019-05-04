package lab2.mobile.web.com.mobile_lab2;

import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.os.StrictMode;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.text.Html;
import android.text.Layout;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;



public class InstagramFetchProfilePicActivity extends AppCompatActivity {

    // Fetching from Layout
    EditText instaText;
    ImageView instaImageView;
    TextView userNameText;
     private LinearLayout loginafterview;
     private Button btnviewinfo , btnLogin ;
     private InstagramApp instapp;
     private HashMap<String,String> userInfoHashMap = new HashMap<String, String>();
     private Handler handler = new Handler(new Handler.Callback() {
         @Override
         public boolean handleMessage(Message message) {
             if(message.what == InstagramApp.WHAT_FINALIZE){
                 userInfoHashMap = instapp.getUserInfo();
             }
             else {
                 Toast.makeText(InstagramFetchProfilePicActivity.this,"Network Issue",Toast.LENGTH_LONG).show();
             }
             return false;
         }
     });
    @Override
    protected void onCreate(Bundle bundle) {
        super.onCreate(bundle);
        setContentView(R.layout.activity_instagram);

       /* // To Override running API's in Async Task
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        instaText = findViewById(R.id.usernameText);
        instaImageView = findViewById(R.id.instaPic);
        userNameText = findViewById(R.id.instaUserName);*/
        instapp = new InstagramApp(this, AppConfig.CLIENT_ID,AppConfig.CLIENT_SECRET, AppConfig.CALLBACK_URL);
        instapp.setListener(new InstagramApp.OAuthAuthenticationListener() {
            @Override
            public void onSuccess() {
                loginafterview.setVisibility(View.VISIBLE);
                btnLogin.setVisibility(View.GONE);
                instapp.fetchUserName(handler);
            }

            @Override
            public void onFail(String error) {
                Toast.makeText(InstagramFetchProfilePicActivity.this,error,Toast.LENGTH_LONG).show();
            }
        });
       initialisation();
       viewClickListener();
    }

    private void initialisation() {
        loginafterview = (LinearLayout)findViewById(R.id.loginafterview);
        btnLogin = (Button)findViewById(R.id.instabtn);
        btnviewinfo = (Button)findViewById(R.id.btnviewinfo);
    }
    private void viewClickListener() {
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                loginUser();
            }
        });
        btnviewinfo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                displayUserInfo();
            }
        });
    }

    private void loginUser() {
        instapp.authorize();
    }
    private void displayUserInfo() {
        AlertDialog.Builder alertDialog = new AlertDialog.Builder(InstagramFetchProfilePicActivity.this);
        alertDialog.setTitle("Profile Information");
        LayoutInflater inflater = (LayoutInflater)getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View view = inflater.inflate(R.layout.profile,null);
        alertDialog.setView(view);
        ImageView isProfileImage = (ImageView)view.findViewById(R.id.isProfileImage);
        TextView name = (TextView)view.findViewById(R.id.tvusername);
        TextView followers = (TextView)view.findViewById(R.id.tvfollower);
        TextView following = (TextView)view.findViewById(R.id.tvfollowing);
        TextView fullname = (TextView)view.findViewById(R.id.tvfullname);

        name.setText(userInfoHashMap.get(InstagramApp.TAG_USERNAME));
        fullname.setText(userInfoHashMap.get(InstagramApp.TAG_FULL_NAME));
        followers.setText(userInfoHashMap.get(InstagramApp.TAG_FOLLOWED_BY));
        following.setText(userInfoHashMap.get(InstagramApp.TAG_FOLLOWS));
        new DownloadImage(isProfileImage)
                .execute(userInfoHashMap.get(InstagramApp.TAG_PROFILE_PICTURE));
        alertDialog.create().show();
    }

   /* // On Click of Button
    public void fetchInstaPicture(View view) {

        // Making Fields Empty First
        userNameText.setText("");
        instaImageView.setImageBitmap(null);

        String userText = instaText.getText().toString();
        // Checking If username is present or not
        if (StringUtils.isEmpty(userText)) {
            userNameText.setText("Username text is Mandatory !!");
            // Throw a Toast saying username is mandatory
            Toast.makeText(InstagramFetchProfilePicActivity.this,
                    "Username text is Mandatory !!", Toast.LENGTH_LONG).show();
        } else {
            // Appending Username to API URL
            String API_URL = "https://apinsta.herokuapp.com/u/"+userText;
            StringBuilder stringBuilder = new StringBuilder();
            try {
                // Fetching Response from API URL
                URL url = new URL(API_URL);
                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                // If ResponseCode is NOT 200, throw a TOAST & text saying User not present.
                if(urlConnection.getResponseCode() != 200){
                    userNameText.setText("No such user '" + userText + "' exists to get Profile Pic!!!");
                    Toast.makeText(InstagramFetchProfilePicActivity.this,
                            "No such user '" + userText + "' exists to get Profile Pic!!!",
                            Toast.LENGTH_LONG).show();
                }else {
                    InputStreamReader inputStreamReader = new InputStreamReader(urlConnection.getInputStream());
                    BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
                    String line;
                    while ((line = bufferedReader.readLine()) != null) {
                        // Appending the Line to StringBuilder
                        stringBuilder.append(line);
                    }
                    final JSONObject jsonResult;
                    final String result = stringBuilder.toString();
                    System.out.println(result);
                    if (StringUtils.isNotEmpty(result) && !result.equals("{}")) {
                        try {
                            jsonResult = new JSONObject(result);
                            // Fetching Profile Pic Hd from JSON
                            JSONObject jsonObject = jsonResult.getJSONObject("graphql").getJSONObject("user");
                            String imageHdURL = jsonObject.getString("profile_pic_url_hd");
                            System.out.println(imageHdURL);
                            // Gliding Hd URL into Image View
                            Glide.with(getApplicationContext()).load(imageHdURL).into(instaImageView);
                            // Fetching Name & Displaying it in UI
                            String userDetText = "Name : "+jsonObject.getString("full_name")
                                    +"<br/> Followers Count : "+jsonObject.getJSONObject("edge_followed_by").getInt("count")
                                    +"<br/> Following Count : "+jsonObject.getJSONObject("edge_follow").getInt("count");
                            userNameText.setText(Html.fromHtml(userDetText));
                        } catch (JSONException e) {
                            Log.e("Error : ", e.getMessage());
                            Toast.makeText(InstagramFetchProfilePicActivity.this,
                                    "JSONException Occured !!", Toast.LENGTH_LONG).show();
                        }
                    } else {
                        userNameText.setText("No such user '" + userText + "' exists to get Profile Pic!!!");
                        Toast.makeText(InstagramFetchProfilePicActivity.this,
                                "No such user '" + userText + "' exists to get Profile Pic!!!",
                                Toast.LENGTH_LONG).show();
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                Toast.makeText(InstagramFetchProfilePicActivity.this,
                        "Exception Occured while fetching Insta pic : " + e.getMessage(), Toast.LENGTH_LONG).show();
            }
        }
    }*/

}
