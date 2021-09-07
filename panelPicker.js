let isPanelDown = false;
let panelPickerOffset = [0, 0];

const panelPicker = document.getElementById("color-panel-picker");
const panelPickerContainer = document.getElementById("color-panel-container");

panelPicker.addEventListener("mousedown", function(e) {
    isPanelDown = true;
    panelPickerOffset = [this.offsetLeft - e.clientX, this.offsetTop - e.clientY];
}, true);

document.addEventListener("mouseup", function(e) {
    isPanelDown = false;
}, true);

panelPickerContainer.addEventListener("mousemove", function(e) {
    event.preventDefault();
    const mousePositionLeft = event.clientX;
    const mousePositionTop = event.clientY;
    const parentWidth = panelPickerContainer.getBoundingClientRect().width;
    const parentHeight = panelPickerContainer.getBoundingClientRect().height;
    if (isPanelDown && mousePositionLeft + panelPickerOffset[0] >= 0 && mousePositionTop + panelPickerOffset[1] >= 0 && parentWidth - 24 >= mousePositionLeft + panelPickerOffset[0] && parentHeight - 34 >= mousePositionTop + panelPickerOffset[1]) {
        panelPicker.style.left = (mousePositionLeft + panelPickerOffset[0]) + "px";
        panelPicker.style.top = (mousePositionTop + panelPickerOffset[1]) + "px";
        updateUserColor();
    }
}, true);