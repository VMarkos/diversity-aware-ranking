let rankedPoints = [];

function rank() { // This is the function called on click.
    rankedPoints = [];
    rankByDistance();
    diversityRank();
    rankedPoints = mixRankings();
    console.log(rankedPoints);
    const sampleBox = document.getElementById("sample-content-box");
    const boxWidth = sampleBox.getBoundingClientRect().width;
    const boxHeight = sampleBox.getBoundingClientRect().height;
    const pointSep = 5;
    const xStep = 100 / Math.ceil((boxWidth - pointSep) / (pointSize + pointSep));
    const yStep = 100 / Math.ceil((boxHeight - pointSep) / (pointSize + pointSep))
    let xOffset = 0;
    let yOffset = 0;
    for (const point of rankedPoints) {
        const pointElement = document.getElementById("point-" + point["id"]);
        pointElement.style.left = xOffset + "%";
        pointElement.style.top = yOffset + "%";
        xOffset += xStep;
        if (xOffset > 100) {
            xOffset = 0;
            yOffset += yStep;
        }
    }
}

function mixRankings() {
    const totalScores = [];
    for (let i=0; i<maxPoints; i++) {
        totalScores.push({
            id: i,
            score: mixRankingScores(i),
        })
    }
    return totalScores.sort((a, b) => {
        return b["score"] - a["score"];
    });
}

function mixRankingScores(id) {
    const diversityCoefficient = document.getElementById("diversity-slider").value / 100;
    let crispScore = 0.0;
    let diverseScore = 0.0;
    for (let i=0; i<maxPoints; i++) {
        if (rankedPoints[i]["id"] === id) {
            crispScore = 1.0 - rankedPoints[i]["distance"];
        }
        if (diversityRanking[i]["id"] === id) {
            diverseScore = diversityRanking[i]["diversity"];
        }
    }
    return diversityCoefficient * diverseScore + (1.0 - diversityCoefficient) * crispScore;
}

function rankByDistance() {
    const headColor = document.getElementById("user-head").style.backgroundColor;
    let target = [255, 255, 255];
    if (headColor !== "") {
        const colorsString = headColor.substring(headColor.indexOf("(") + 1, headColor.indexOf(")"));
        const colors = colorsString.split(",");
        target = [parseFloat(colors[0]), parseFloat(colors[1]), parseFloat(colors[2])];
    }
    const MAX_DISTANCE = 375.596; // Maximum distance in the CIEL*ab color space.
    for (let i=0; i<pointColors.length; i++) {
        rankedPoints.push({
            id: i,
            distance: colorDistance(target, pointColors[i]) / MAX_DISTANCE,
        });
    }
    rankedPoints.sort((a, b) => {
        return a["distance"] - b["distance"];
    });
}

function colorDistance(color1, color2) { // Both colors in RGB.
    color1 = rgb2lab(color1);
    color2 = rgb2lab(color2);
    let distance = 0;
    for (let i=0; i<color1.length; i++) {
        distance += Math.pow(color1[i] - color2[i], 2);
    }
    return Math.sqrt(distance);
}

function rgb2lab(color) {
    red = rgb2srgb(color[0] / 255.0);
    green = rgb2srgb(color[1] / 255.0);
    blue = rgb2srgb(color[2] / 255.0);
    x = 41.24 * red + 35.76 * green + 18.05 * blue;
    y = 21.26 * red + 71.52 * green + 7.22 * blue;
    z = 1.93 * red + 11.92 * green + 95.05 * blue;
    const fx = xyz2fxyz(x / 95.047);
    const fy = xyz2fxyz(y / 100.0);
    const fz = xyz2fxyz(z / 108.883);
    Ls = (116 * fy) - 16;
    a = 500 * (fx - fy);
    b = 200 * (fy - fz);
    return [Ls, a, b];
}

function rgb2srgb(color) {
    if  (color <= 0.04045) {
        return color / 12.92;
    }
    return Math.pow(((color + 0.055) / 1.055), 2.4);
}

function xyz2fxyz(x) {
    const eps = 0.008856;
    const k = 7.787;
    if (x > eps) {
        return Math.pow(x, (1 / 3.0));
    }
    return ((k * x) + 16 / 116.0);
}
