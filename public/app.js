const webElements = {
    body: document.body,
    title: document.querySelector("#website-title"),
    mysteryButtonSelector: document.querySelectorAll(".mystery-button"),
    toggleableForm: document.querySelector("#mystery-four-input-form"),
    toggleableFormValue: document.querySelector("#mystery-four-input"),
    submitButton: document.querySelector("#submit-button"),
}

const states = {
    currentlySelectedMystery: null
}

const mysteryKeybinds = {}

const initListeners = () => {
    let DOMQueryOrder = 1;
    for(const mysteryButton of webElements.mysteryButtonSelector){
        mysteryKeybinds[DOMQueryOrder] = mysteryButton;
        mysteryButton.addEventListener('click', () => {
            mysteryButtonActivation(mysteryButton);
        });
        window.addEventListener('keydown', (event) => {
            let mysteryBinds = (event.ctrlKey && event.altKey);
            let mysteryKey = (mysteryKeybinds[event.key] === mysteryButton);

            if(mysteryBinds && mysteryKey){
                mysteryButtonActivation(mysteryButton);
            }
        });
        DOMQueryOrder++;
    }

    webElements.submitButton.addEventListener('click', (event) =>{
        submitActivation();
    });

    window.addEventListener("keydown", (event) => {
        let submit = (event.ctrlKey && event.altKey && event.key.toLowerCase() === "s");
        if(submit) submitActivation();
    });
}

function mysteryButtonActivation(mysteryButton){
    mysteryButton.classList.toggle("is-pressed");

    if(mysteryButton === states.currentlySelectedMystery) {
        states.currentlySelectedMystery = null;
    }else if(states.currentlySelectedMystery != null){
        states.currentlySelectedMystery.classList.toggle("is-pressed");
        if(states.currentlySelectedMystery === document.getElementById("mystery-fourth")){
            webElements.toggleableForm.style.display = "none";
        }
        states.currentlySelectedMystery = mysteryButton;
    }else{
        states.currentlySelectedMystery = mysteryButton;
    }

    /* This is not very efficient in terms of evaluating this code every button
    * But the scope of this project is small enough to justify the burden
     */
    if(mysteryButton === document.getElementById("mystery-fourth")){
        if(webElements.toggleableForm.style.display === "flex") {
            webElements.toggleableForm.style.display = "none";
        }else{
            webElements.toggleableForm.style.display = "flex";
        }
    }
}

//Sends data to processor
function submitActivation(){
    if(states.currentlySelectedMystery){
        const userInput = webElements.toggleableFormValue.value;
        processor(states.currentlySelectedMystery, userInput)
            .then(r => {
                console.log("State Reset");
            });
    }
}

const backgroundAnimation = () => {
    if (webElements.body) {
        let time = 0;
        function animatedBackground(){
            webElements.body.style.backgroundColor = `hsl(40, 12 ${time})`;
            time = (time + 1) % 360;
            requestAnimationFrame(animatedBackground);
        }
        animatedBackground();
    }
}

backgroundAnimation();
initListeners();
console.log(mysteryKeybinds);
