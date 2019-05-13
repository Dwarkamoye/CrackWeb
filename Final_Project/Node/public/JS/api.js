
function goback(){
    window.location.replace("index.html");
}
function online(){
    stop_the_game();
    $('#online').modal('show');
    $("#login-body").removeClass("showNone").addClass("showBlock");
    $("#login-title").removeClass("showNone").addClass("showBlock");
    $("#login-sv").removeClass("showNone").addClass("showBlock");
    $("#signup-body").removeClass("showBlock").addClass("showNone");
    $("#sign-title").removeClass("showBlock").addClass("showNone");
    $("#sign-sv").removeClass("showBlock").addClass("showNone");
}
function showsignin(){
    $("#login-body").removeClass("showBlock").addClass("showNone");
    $("#login-title").removeClass("showBlock").addClass("showNone");
    $("#login-sv").removeClass("showBlock").addClass("showNone");
    $("#signup-body").removeClass("showNone").addClass("showBlock");
    $("#sign-title").removeClass("showNone").addClass("showBlock");
    $("#sign-sv").removeClass("showNone").addClass("showBlock");
}
function afterlogin(userdata){
    $('#online').modal('hide');
    user.text(userdata.user.email);
    sessionStorage.setItem("race-user",  JSON.stringify(userdata.user));
    $("#loginuser").removeClass("showNone").addClass("showBlock");
    $("#go_online").removeClass("showBlock").addClass("showNone");
    Notification.requestPermission().then(function(result) {
        console.log(result);
    });
}
function login(txt){
    if(txt == 'login')
    {
        var url = "/login";
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        if(email === "" && password === ""){return;}
        var data = {email:email,password:password};
        $.post(url,data,function(data,status){
            if(status === "success")
            {
                console.log("login");
                console.log(data);
                afterlogin(data);

            }
            else{
                alert(status);
                alert(data);
            }
        })
    }
    else
    {
        var url = "/signin";
        // var name = document.getElementById("sign-name").value;
        var email = document.getElementById("sign-email").value;
        var password = document.getElementById("sign-password").value;
        if(email === "" && password === ""){return;}
        var data = {email:email,password:password};
        $.post(url,data,function(data,status){
            if(status === "success")
            {
                console.log("signin");
                console.log(data);
                afterlogin(data);
            }
            else{
                alert(status);
                alert(data);
            }
        })
    }


}
function logout(){
    var url = "/logout";
    var email = JSON.parse(sessionStorage.getItem("race-user"));
    var data = {email:email.email};
    $.post(url,data,function(data,status){
        if(status === "success")
        {
            console.log("logout");
            console.log(data);
            sessionStorage.removeItem("race-user");
            user.text("");
            $("#loginuser").removeClass("showBlock").addClass("showNone");
            $("#go_online").removeClass("showNone").addClass("showBlock");
        }
        else{
            console.log(status);
            alert(data);
        }
    })
}
function saveScore() {
    var userScore = parseInt(score.text());
    var obj = JSON.parse(sessionStorage.getItem("race-user"));
    if(obj !== null)
    {
        if(obj.email){
            var email = obj.email;
            var uid = obj.uid;
            console.log(userScore + "  "+email);
            var url = "/savescore";
            var data = {uid:uid,email:email,score:userScore};
            pubnubPublish(data);
            $.post(url,data,function(data,status){
                if(status === "success")
                {
                    console.log("save score");
                    console.log(data);
                    $('#restart-mod').modal('hide');
                    start_game();
                }
                else{
                    console.log(status);
                    alert(data);
                }
            })
        }
    }
    else{
        var confirmLogin = confirm("Login To publish the score");
        if(confirmLogin){
            $('#restart-mod').modal('hide');
            online();
        }
    }


}
function leaderboard(){
    var url = '/readData';
    $.get(url,function(data,status){
        if(status === "success")
        {
            data.sort(function (a, b) {
                return b.score - a.score;
            });
            console.log("Read data");
            console.log(data);
            if($('#leaderTable').length){
                $( "#leaderTable" ).remove();
            }
            showLeaderboard(data);
        }
        else{
            console.log(status);
            alert(data);
        }
    })
    $('#leaderboard').modal('show');

}
function showLeaderboard(data) {
    var tbl = document.createElement("table");
    tbl.setAttribute("id","leaderTable");
    var tblBody = document.createElement("tbody");

    // creating all cells
    for (var i = 0; i < data.length; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < 2; j++) {
            var cell = document.createElement("td");

            var cellText;
            if(j==0){
                cell.classList.add("col-lg-6",'text-left');
                cellText = document.createTextNode(data[i].email);
            }
            else{
                cell.classList.add("col-lg-6",'text-center');
                cellText = document.createTextNode(data[i].score);
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    var ld = document.getElementById("leaderboard-body");
    ld.appendChild(tbl);
}
function createNotifications(title,score){
    var img = 'img/start.gif';
    var text = 'Name: '+ title +'\nScore: '+score;
    var notification = new Notification('Speed It', { body: text, icon: img });
}
