function onLoad() {
    initColourPickerLine();
    initColourPanel("255,0,0");
    if (window.localStorage.getItem("hasVisited") === null) {
        window.localStorage.setItem("hasVisited", "false");
    }
    if (window.localStorage.getItem("hasVisited") === "false") {
        document.getElementById("tour-popup").style.visibility = "visible";
        localStorage.setItem("hasVisited", "true");
    }
    const windowWidth = document.body.clientWidth;
    document.getElementById("body-container").style.minWidth = windowWidth + "px";
}

function diversityCoefficient() {
    const sliderValue = document.getElementById("diversity-slider").value;
    document.getElementById("diversity-coefficient").innerHTML = sliderValue + "%";
}
