function triggerColor(colorName){
    (new Audio("./sounds/"+colorName+".mp3")).play();
    $("#"+colorName).addClass("pressed");
    setTimeout(function () {        
        $("#"+colorName).removeClass("pressed");
    }, 100);
}

function triggerWrong(){
    (new Audio("./sounds/wrong.mp3")).play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 100);
}

function indexToColor(idx){
    switch(idx){
        case 1:
            return "green";
        case 2:
            return "red";
        case 3:
            return "yellow";
        case 4:
            return "blue";
        default:
            console.log("Invalid index value: " + idx);
            return "";
    }
}

function generateNextColor(){
    return indexToColor(1 + Math.floor(Math.random() * 4));
}

function setInstructionRemember(){
    $("#player-instruction").text("REMEMBER THIS!");
}

function setInstructionRepeat(){
    $("#player-instruction").text("REPEAT THE SEQUENCE!");
}

function runSimonGame(){
    $(document).off("keydown");

    $("#player-instruction").slideDown();
    
    var level = 1;
    var sequence = [];

    $("#level-title").text("Level " + level);
    
    // start sequence
    setInstructionRemember();

    setTimeout(function () {
        var newColor = generateNextColor();
        triggerColor(newColor);
        sequence.push(newColor);        
    }, 1000);

    setTimeout(function () {
        setInstructionRepeat();
    },1500);

    // check player input sequence
    var idx = 0;
    $(".btn").on("click", function(){
        var inputColor = this.id;
        if (sequence[idx] == inputColor){
            triggerColor(inputColor);
            idx++;

            if (idx == sequence.length){
                level++;
                $("#level-title").text("Level " + level);
                setInstructionRemember();

                setTimeout(function () {
                    var newColor = generateNextColor();
                    sequence.push(newColor);
                    triggerColor(newColor);
                    setInstructionRepeat();
                }, 1000);

                idx = 0;
            }
        }else{
            triggerWrong();
            $(".btn").off("click");
            $("#player-instruction").slideUp();
            $("#level-title").text("Game Over, Press Any Key to Restart");
            $(document).on("keydown", runSimonGame);
        }
    });
}

/* MAIN */
$(document).on("keydown", runSimonGame);