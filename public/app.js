const webElements = {
    body: document.body,
    mysteryButtonSelector: document.querySelectorAll(".mystery-button"),
    toggleableForm: document.querySelector("#mystery-four-input-form"),
    submitButton: document.querySelector("#submit-button"),
}

let currentlySelected = null;

//Initialize all relevant mystery button event listeners and details
let i = 0;
for(const mysteryButton of webElements.mysteryButtonSelector){

    mysteryButton.addEventListener('click', () => {
        mysteryButton.classList.toggle("is-pressed");

        if(mysteryButton === currentlySelected) {
            currentlySelected = null;
        }else if(currentlySelected != null){
            currentlySelected.classList.toggle("is-pressed");
            if(currentlySelected === document.getElementById("mystery-fourth")){
                webElements.toggleableForm.style.display = "none";
            }
            currentlySelected = mysteryButton;
        }else{
            currentlySelected = mysteryButton;
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
    });
    i++;
}

//Placeholder for submission event listener
webElements.submitButton.addEventListener('click', () =>{
    const currentDate = new Date().toLocaleTimeString();
    if(currentlySelected){
        const buttonContent = currentlySelected.innerHTML;
        console.log("At: " + currentDate + " || " + buttonContent);
    }
});

if (webElements.body) {
    let time = 0;
    function animatedBackground(){
        webElements.body.style.backgroundColor = `hsl(40, 12 ${time})`;
        time = (time + 1) % 360;
        requestAnimationFrame(animatedBackground);
    }
    animatedBackground();
}

