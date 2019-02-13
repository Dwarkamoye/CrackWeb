$(document).ready(function(){
 //To keep home in the navbar active on load
    $('#home-navbar').addClass("active");
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }
    });
// Adding active class to navbar headers if the specific region is reached
    $(window).scroll(function() {
        $(".slideanim").each(function(){
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });
//Active class on click
    $(".navbar .nav-link").on("click", function(){
        $(".navbar").find(".active").removeClass("active");
        $(this).addClass("active");
    });
    $(".dropdown-toggle").dropdown();
    //If user is logged in on refresh retainning it
    if(sessionStorage.getItem("loginUser"))
    {
        $("#login-signup").removeClass("showBlock").addClass("showNone");
        $("#loggedIn").removeClass("showNone").addClass("showBlock");
        document.getElementById("loggedIn").innerHTML = "Hi "+ sessionStorage.getItem("loginUser");
    }

});
// Getting into sub categories page and removing the home content
function showRelated(page)
{
    var removePage = document.getElementById("main");
    $("#main").removeClass("showBlock").addClass("showNone");
    var pageToAppend = document.getElementById("sub");
    pageToAppend.innerHTML =   "<div  data-include='"+page+"'></div>";
    $(function(){
        var includes = $('[data-include]');
        jQuery.each(includes, function(){
            var file = $(this).data('include')+'/' + $(this).data('include') + '.html';
            $(this).load(file);
        });
    });
}
//function to navigate to different sections in home page
function backToHome()
{
    $("#main").removeClass("showNone").addClass("showBlock");
    var pageToAppend = document.getElementById("sub");
    pageToAppend.innerHTML = "";
}
//function to toggle between the subcategories in each page.
function togglePage(keep,remove)
{
    $(".leftbar .left-link").on("click", function(){
        $(".leftbar").find(".active").removeClass("active");
        $(this).addClass("active");
    });
    $("#"+keep).removeClass("showNone").addClass("showBlock");
    $("#"+remove).removeClass("showBlock").addClass("showNone");
}
// function to login user with username and persist it in all pages.
function login(user){
    if(user == "login")
    {
        var username = document.getElementById("loginEmail").value;
        var password = document.getElementById("loginPassword").innerHTML;
        sessionStorage.setItem("loginUser", username);
        $("#login-signup").removeClass("showBlock").addClass("showNone");
        document.getElementById("loggedIn").innerHTML = "Hi "+ sessionStorage.getItem("loginUser");
        $("#loggedIn").removeClass("showNone").addClass("showBlock");
        document.getElementById("loginEmail").value ="";
        document.getElementById("loginPassword").value = "";
    }
    else
    {
        $("#login-signup").removeClass("showBlock").addClass("showNone");
        document.getElementById("loggedIn").innerHTML = "Hi Guest";
        $("#loggedIn").removeClass("showNone").addClass("showBlock");
        sessionStorage.setItem("loginUser", "Guest");
    }

}
function onSignup(){
    alert("Confirmation mail has been sent to your signup mail.Please accept and set password.");
}
//function to help user logout of the account
function logout(){
    $("#login-signup").removeClass("showNone").addClass("showBlock");
    $("#loggedIn").removeClass("showBlock").addClass("showNone");
     sessionStorage.removeItem('loginUser');
    backToHome();
}