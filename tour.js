function startTour() {
    document.getElementById("tour-1").style.boxShadow = "0 0 0 200vmax rgba(0, 0, 0, 0.6)";
    document.getElementById("tour-1").style.zIndex = 1;
    document.getElementById("help-sidebar-1").style.visibility = "visible";
}

function tourStep(step) {
    const previous = step - 1;
    document.getElementById("help-sidebar-" + previous).style.visibility = "hidden";
    document.getElementById("tour-" + previous).style.boxShadow = "";
    document.getElementById("tour-" + previous).style.zIndex = 0;
    document.getElementById("tour-" + step).style.zIndex = 1;
    document.getElementById("tour-" + step).style.boxShadow = "0 0 0 200vmax rgba(0, 0, 0, 0.6)";
    document.getElementById("help-sidebar-" + step).style.visibility = "visible";
}

function tourEnd() {
    document.getElementById("help-sidebar-6").style.visibility = "hidden";
    document.getElementById("tour-6").style.boxShadow = "";
    document.getElementById("tour-6").style.zIndex = 0;
}