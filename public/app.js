const body = document.body

if (body) {
    let time = 0;
    function animatedBackground(){
        body.style.backgroundColor = `hsl(40, 12 ${time})`;
        time = (time + 1) % 360;
        requestAnimationFrame(animatedBackground);
    }
    animatedBackground();
}