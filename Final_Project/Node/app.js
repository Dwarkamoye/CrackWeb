var express = require('express');
var app = express();
var path = require('path');
var dirname = "/public";
//var PubNub = require('pubnub');
const bodyParser  = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, dirname)));
var firebase = require("firebase/app");
// Import Admin SDK
var admin = require("firebase-admin");
require("firebase/auth");
require("firebase/firestore");
require("@firebase/database");
var firebaseConfig = {
    apiKey: "AIzaSyD4tuWMMYPojLBL6bZbb2df9qxxRIG3CU0",
    authDomain: "web-final-f52db.firebaseapp.com",
    databaseURL: "https://web-final-f52db.firebaseio.com",
    projectId: "web-final-f52db",
    storageBucket: "web-final-f52db.appspot.com",
    messagingSenderId: "939555638837",
    appId: "1:939555638837:web:bebcab067a213da3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a database reference
//var database = firebase.database();
app.post('/login', (req, res) => {
    if(Object.keys(req.body)!==0){
        var email = req.body.email;
        var password = req.body.password;
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
            console.log("login node");
            res.send(user);
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            res.send(errorMessage);
        });
    }
});
app.post('/signin', (req, res) => {
    if(Object.keys(req.body)!=0){
        var email = req.body.email;
        var password = req.body.password;
        var displayName = req.body.name;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
            console.log("sign node");
            res.send("signin sucessful");
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            res.send(errorMessage);
        });
    }
});
app.post('/logout',(req,res)=>{
    console.log("logout node");
    console.log(req.body);
    firebase.auth().signOut().then(function() {
        res.send("loggedout")
    }).catch(function(error) {
        // An error happened.
    });
});
app.post('/savescore',(req,res)=>{
    console.log("save node");
    console.log(req.body);
    if(Object.keys(req.body)!==0) {
        var id = req.body.uid;
        var email = req.body.email;
        var score = req.body.score;
        writeUserData(id,email,score);
        setTimeout(function(){ res.send(true); }, 1000);
    }
});
app.get('/readData',(req,res)=>{
    console.log("In read data");
    var arr = [];
    var usersRef = firebase.database().ref('users');
    usersRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            arr.push(childData);
        });
        setTimeout(function(){ res.send(arr); }, 2000);
    });
});
function writeUserData(userId,email, score) {
    firebase.database().ref('users/' + userId).set({
        email: email,
        score : score
    });
}

function publish() {

    pubnub = new PubNub({
        publishKey : 'demo',
        subscribeKey : 'demo'
    })

    function publishSampleMessage() {
        console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.");
        var publishConfig = {
            channel : "hello_world",
            message : {
                title: "greeting",
                description: "hello world!"
            }
        }
        pubnub.publish(publishConfig, function(status, response) {
            console.log(status, response);
        })
    }

    pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                publishSampleMessage();
            }
        },
        message: function(msg) {
            console.log(msg.message.title);
            console.log(msg.message.description);
        },
        presence: function(presenceEvent) {
            // handle presence
        }
    })
    console.log("Subscribing..");
    pubnub.subscribe({
        channels: ['hello_world']
    });
};
app.listen(5000, function () {
    console.log('App listening on port 5000!');
});
