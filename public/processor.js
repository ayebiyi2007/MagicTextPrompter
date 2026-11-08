//Web elements & states defined in app.js
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
    // Avoid the browser's normal form submission, which would reload the page.
    webElements.submitButton.disabled = true;
    webElements.title.textContent = 'Asking the server…';

    try {
        // A relative URL reaches the same Node server that delivered this page.
        // Give the request a time limit so a stalled connection doesn't wait forever.
        const response = await fetch('/mystery', {
            signal: AbortSignal.timeout(10000),
        });
        // JSON from the backend becomes a normal JavaScript object in the browser.
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'The request failed.');

        // textContent displays input as text, preventing it from becoming HTML code.
        return data.message;
    } catch (error) {
        // Show validation, network, and timeout failures so the user can try again.
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