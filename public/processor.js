//Web elements & states defined in app.js

async function processor(currentlySelectedMystery, userInput){
    const mysteryFourthBoolean = currentlySelectedMystery === document.getElementById("mystery-fourth");

    logMystery(currentlySelectedMystery);
    if(mysteryFourthBoolean){
        logUserInput(userInput);
    }

    try{
        const mystery = await sourceMystery(currentlySelectedMystery);
        webElements.title.innerHTML = mystery;
    }catch(error){
        console.log("ERROR: No Mystery for you! || " + error);
    }
}

//Fetch from backend will be handled here
async function sourceMystery(currentlySelectedMystery){
    webElements.submitButton.disabled = true;
    //Prevent quick flash of server prompter if the server is fast enough
    setTimeout(() => {
        if(webElements.submitButton.disabled)
            webElements.title.textContent = 'Asking the server…';
    }, 100);

    let response = null;
    try {
        if(currentlySelectedMystery === webElements.mysteryFourth){
            response = await fetch('/mystery/fourth', {
                signal: AbortSignal.timeout(10000),
            });
        }else {
            response = await fetch('/mystery', {
                signal: AbortSignal.timeout(10000),
            });
        }

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'The request failed.');

        return data.message;
    } catch (error) {
         return error.name === 'TimeoutError'
            ? 'The server took too long. Please try again.'
            : error.message;
    } finally {
        // Always re-enable the button, whether the request succeeded or failed.
        webElements.submitButton.disabled = false;
    }
}

const logMystery = (currentlySelectedMystery) => {
    const currentDate = new Date().toLocaleTimeString();
    const buttonContent = currentlySelectedMystery.innerHTML;
    console.log("At: " + currentDate + " || " + buttonContent);
}

const logUserInput = (userInput) => {
    console.log("Message: " + userInput);
}