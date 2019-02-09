$(document).ready(function(){
$('#username').on('keyup',function(e){
let Username= e.target.value;
//ajax request  to github to fetch user details
$.ajax({
    url:'https://api.github.com/users/'+Username,
    data:{
        client_id:'ac40e73922ca75b08b59',
        client_secret:'d365e4d2c50d86eb070c54716ddec8a2bc3ac583'
    },
    statusCode: {
        // on error or mismatch username
        404: function() {
            console.log( "page not found" );
            $('#profile').html('<h2 class="text-center">Oops!! Username not found. Sit back.. Re think </h2>');
        }
    }
    // on success populate the data
}).done(function(userdata){
$('#profile').html('<div class="panel panel-default">\n' +
    '    <div class="panel-heading col-md-6" style="">\n' +
    '        <h3 class="panel-title" style="margin-left: 18vw">'+userdata.name+'</h3>\n' +
    '    </div><br>\n' +
    '    <div class="panel-body">\n' +
    '        <div class="row">\n' +
    '        <div class="col-md-6" style="text-align:right">\n' +
    '            <img class="thumbnail avatar pull-right" src="'+userdata.avatar_url+'"><br><br>\n' +
    '        </div><br><br>\n' +
    ' <div class="col-md-6 padding-left-details">\n'+
    '            <span class="">User ID : '+userdata.id+'</span><br><br>\n'+
    '            <span class="">Followers : ' +userdata.followers+'</span><br><br>\n'+
    '            <span class="">Following : ' +userdata.following+'</span><br><br>\n'+
    '            <span class="">Number of Public Repos : '+userdata.public_repos+'</span><br><br>\n'+
    '            <span class="">Number of Public Gists : '+userdata.public_gists+'</span><br><br>\n'+
    '             <br><br>\n'+
    '        </div>\n' +
    '<div class="col-md-12 text-center">\n' +
    '    <a role="button" class="btn btn-outline-success" href="'+userdata.html_url+'" >View Profile</a>\n'+
            '</div>\n'+
    '</div>\n' +
    '</div>\n');
})
    });
});


