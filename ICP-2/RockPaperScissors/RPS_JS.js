var compInput;
//get computer input.
function getComputerInput(){
    var computerInput = Math.random();
    if (computerInput < 0.34) {
         compInput = "rock";
        return compInput;
    } else if(computerInput <= 0.67) {
       compInput = "paper";
        return compInput;
    } else {
        compInput = "scissor";
         return compInput;
    }
}
//compare the user input and computer input, decide the winner
var Winner= function(Uinput,Cinput){
    if (Uinput === Cinput) {
        return "It is a Tie";
    }
    else if ((Uinput==="rock" && Cinput==="scissor") || (Uinput==="paper" && Cinput==="rock") || (Uinput==="scissor" && Cinput==="paper")){
        return "Congratulations!!, You Win";
    }
    else {
        return "Sorry, You lost. Try again!!";
    }
}
//call the final function
const playGame = function(id) {
    const Uinput = id;
    const computerInput = getComputerInput();
    document.getElementById("winner").innerHTML ="Your input is :"+Uinput;
    document.getElementById("winner1").innerHTML ="The computer Input is :"+computerInput;
    var winner=Winner(Uinput,computerInput)
    document.getElementById("winner2").innerHTML =winner;
};



