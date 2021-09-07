function onLoad() {
    initColourPickerLine();
    initColourPanel("255,0,0");
}

function diversityCoefficient() {
    const sliderValue = document.getElementById("diversity-slider").value;
    document.getElementById("diversity-coefficient").innerHTML = sliderValue + "%";
}
