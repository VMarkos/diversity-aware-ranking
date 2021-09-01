function onLoad() {
    initColourPickerLine();
    initColourPanel();
}

function diversityCoefficient() {
    const sliderValue = document.getElementById("diversity-slider").value;
    document.getElementById("diversity-coefficient").innerHTML = sliderValue + "%";
}