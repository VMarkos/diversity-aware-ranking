let pointColors = [];

const pointSize = 25; // Measured in px
const pointMargin = 20; // Measured in px

function plotPoints() {
    pointColors = [];
    const sampleBox = document.getElementById("sample-content-box");
    sampleBox.innerHTML = "";
    const boxWidth = sampleBox.getBoundingClientRect().width;
    const boxHeight = sampleBox.getBoundingClientRect().height;
    const points = generatePointsInBox(boxWidth, boxHeight, pointSize, pointMargin);
    for (let id=0; id<points.length; id++) {
        const point = points[id];
        const newPoint = document.createElement("div");
        newPoint.className = "data-point";
        newPoint.id = "point-" + id;
        newPoint.style.height = pointSize + "px";
        newPoint.style.width = pointSize + "px";
        newPoint.style.left = 100 * point["x"] / boxWidth + "%";
        newPoint.style.top = 100 * point["y"] / boxHeight + "%";
        const color = [Math.floor(256*Math.random()), Math.floor(256*Math.random()), Math.floor(256*Math.random())];
        newPoint.style.backgroundColor = "rgba(" + color[0] + "," + color[1] + "," + color[2] + ",255)";
        sampleBox.appendChild(newPoint);
        pointColors.push(color);
    }
}

function generatePointsInBox(boxWidth, boxHeight, pointSize, pointMargin) {
    let maxPoints = 30;
    if ((maxPoints * (pointSize + pointMargin) ^ 2) > ((boxHeight - pointMargin) * (boxWidth - pointMargin))) {
        maxPoints = Math.floor((boxWidth - pointMargin) * (boxHeight - pointMargin) / ((pointSize + pointMargin) ^ 2));
    }
    const points = []; // Array of points, where each point is a {x: x, y: y} object;
    for (let i=0; i<maxPoints; i++) {
        let x = pointMargin + (boxWidth - pointSize - pointMargin) * Math.random();
        let y = pointMargin + (boxHeight - pointSize - pointMargin) * Math.random();
        while (!pointFitsBox(x, y, points, pointSize, pointMargin)) {
            x = pointMargin + (boxWidth - pointSize - pointMargin) * Math.random();
            y = pointMargin + (boxHeight - pointSize - pointMargin) * Math.random();
        }
        points.push({
            x: x,
            y: y,
        });
    }
    return points;
}

function pointFitsBox(x, y, points, pointSize, pointMargin) {
    if (points === undefined || points.length === 0) {
        return true;
    }
    const centralDistance = pointSize + pointMargin;
    for (const point of points) {
        if (Math.abs(x - point["x"]) + Math.abs(y - point["y"]) < centralDistance) {
            return false;
        }
    }
    return true;
}
