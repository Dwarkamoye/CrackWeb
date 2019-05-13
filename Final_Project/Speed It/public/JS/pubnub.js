var pubnub = new PubNub({
    subscribeKey: 'sub-c-72b99218-750a-11e9-b514-6a4d3cd75da8', // always required
    publishKey: 'pub-c-cbcbae8d-6ad4-4567-abc2-591488e68647' // only required if publishing
});

pubnub.addListener({
    message: function(message) {
        if(message){
            console.log(message.message);
            createNotifications(message.message.email,message.message.score);
        }
    }
})

pubnub.subscribe({
    channels: ['device-notify']
});
var pubnubPublish = function(msg){
    pubnub.publish(
        {
            message: msg,
            channel: 'device-notify'
        }
    );
};
