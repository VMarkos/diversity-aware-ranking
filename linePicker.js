let isLineDown = false;
let linePickerOffset = 0;
let pickedColor = {};

const linePicker = document.getElementById("color-line-picker");
const linePickerContainer = document.getElementById("color-line-container");

linePicker.addEventListener("mousedown", function(e) {
    isLineDown = true;
    linePickerOffset = this.offsetLeft - e.clientX;
}, true);

document.addEventListener("mouseup", function(e) {
    isLineDown = false;
}, true);

linePickerContainer.addEventListener("mousemove", function(e) {
    event.preventDefault();
    const mousePositionLeft = event.clientX;
    const parentWidth = linePickerContainer.getBoundingClientRect().width;
    if (isLineDown && mousePositionLeft + linePickerOffset >= 0 && parentWidth - 24 >= mousePositionLeft + linePickerOffset) {
        linePicker.style.left = (mousePositionLeft + linePickerOffset) + "px";
        const linePositionColor = 300 * (mousePositionLeft + linePickerOffset) / (parentWidth - 20);
        // console.log(linePositionColor);
        let imageData = document.getElementById("color-line").getContext("2d").getImageData(linePositionColor, 0, 1, 1);
        initColourPanel(`${imageData.data[0]}, ${imageData.data[1]}, ${imageData.data[2]}`);
        updateUserColor();
    }
}, true);