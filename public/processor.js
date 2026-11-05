//Web elements & Status defined in app.js
let count = 1; //Temporary global goof variable

async function processor(currentlySelectedMystery, userInput){
    const mysteryFourthBoolean = currentlySelectedMystery === document.getElementById("mystery-fourth");

    logMystery(currentlySelectedMystery);
    if(mysteryFourthBoolean){
        logUserInput(userInput);
    }

    try{
        const mystery = await sourceMystery();
        webElements.title.innerHTML = mystery;
    }catch(error){
        console.log("ERROR: No Mystery for you! || " + error);
    }
}

//Fetch from backend will be handled here
async function sourceMystery(){
    const theEes = [];
    for(let i = 0; i < count; i++){
        theEes.push('e');
    }
    const stringed = theEes.join("");
    count++;

    return "Magic Te" + stringed + "xt Prompter";
}

const logMystery = (currentlySelectedMystery) => {
    const currentDate = new Date().toLocaleTimeString();
    const buttonContent = currentlySelectedMystery.innerHTML;
    console.log("At: " + currentDate + " || " + buttonContent);
}

const logUserInput = (userInput) => {
    console.log(userInput);
}