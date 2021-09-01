function initColourPickerLine() {
    const width = document.getElementById("color-line").width;
    const height = document.getElementById("color-line").height;
    const context = document.getElementById("color-line").getContext("2d");
    const gradient = context.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "rgb(255, 0, 0)");
    gradient.addColorStop(0.167, "rgb(255, 255, 0)");
    gradient.addColorStop(0.333, "rgb(0, 255, 0)");
    gradient.addColorStop(0.5, "rgb(0, 255, 255)");
    gradient.addColorStop(0.667, "rgb(0, 0, 255)");
    gradient.addColorStop(0.834, "rgb(255, 0, 255)");
    gradient.addColorStop(1, "rgb(255, 0, 0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
}

function initColourPanel() {
    const width = document.getElementById("color-panel").width;
    const height = document.getElementById("color-panel").height;
    const context = document.getElementById("color-panel").getContext("2d");
    const horizontalGradient = context.createLinearGradient(0, 0, width, 0);
    horizontalGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    horizontalGradient.addColorStop(1, "rgba(255, 0, 0, 1)");
    context.fillStyle = horizontalGradient;
    context.fillRect(0, 0, width, height);
    const verticalGradient = context.createLinearGradient(0, 0, 0, height);
    verticalGradient.addColorStop(0, "rgba(255, 0, 0, 0)");
    verticalGradient.addColorStop(1, "rgba(0, 0, 0, 1)");
    context.fillStyle = verticalGradient;
    context.fillRect(0, 0, width, height);
}