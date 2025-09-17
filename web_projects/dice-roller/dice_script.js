function getDiceRoll(){
    return 1 + Math.floor(Math.random() * 6);
}

function getDiceImgName(score){
    return "./images/dice" + score + ".png";
}

function rollDice(){
    var p1Score = getDiceRoll();
    var p1ImgName = getDiceImgName(p1Score);
    
    var p2Score = getDiceRoll();
    var p2ImgName = getDiceImgName(p2Score);
    
    document.querySelector(".img1").setAttribute("src", p1ImgName);
    document.querySelector(".img2").setAttribute("src", p2ImgName);
    
    if (p1Score > p2Score){
        document.querySelector(".winnerLabel").textContent = "🚩 Player 1 Wins!";
    }else if (p2Score > p1Score){
        document.querySelector(".winnerLabel").textContent = "Player 2 Wins! 🚩";
    }else{
        document.querySelector(".winnerLabel").textContent = "🚩 It's a draw! 🚩";
    }
}

document.querySelector(".diceRollButton").addEventListener("click", rollDice)
