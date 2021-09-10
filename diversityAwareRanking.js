let diversityRanking = [];

const CENTRAL_COLOR = [118.91342074269278, 118.91749842044715, 118.9041171128004]; // L*ab values: [50, 0, 0].

function diversityRank() {
    diversityRanking = [];
    const headColor = document.getElementById("user-head").style.backgroundColor;
    let target = [255, 255, 255];
    if (headColor !== "") {
        const colorsString = headColor.substring(headColor.indexOf("(") + 1, headColor.indexOf(")"));
        const colors = colorsString.split(",");
        target = [parseFloat(colors[0]), parseFloat(colors[1]), parseFloat(colors[2])];
    }
    const unexploredEntities = [...pointColors];
    const exploredEntities = [target];
    while (unexploredEntities.length > 0) {
        const maxEntity = maximumDiversityContribution(exploredEntities, unexploredEntities);
        diversityRanking.push({
            id: pointColors.indexOf(maxEntity),
            diversity: diversityContribution(exploredEntities, maxEntity),
        });
        unexploredEntities.splice(unexploredEntities.indexOf(maxEntity), 1);
        exploredEntities.push(maxEntity);
    }
}

function maximumDiversityContribution(sample, entities) {
    let maxEntity = entities[0];
    let maxContribution = diversityContribution(sample, maxEntity);
    for (const entity of entities) {
        const divContrib = diversityContribution(sample, entity);
        if (divContrib > maxContribution) {
            maxEntity = entity;
            maxContribution = divContrib;
        }
    }
    return maxEntity;
}

function diversityContribution(entities, entity) {
    const initialEntropy = diversity(entities);
    const newEntities = [...entities];
    newEntities.push(entity);
    const finalEntropy = diversity(newEntities);
    return (finalEntropy - initialEntropy) / Math.log(entities.length + 1);
}

function diversity(entities) { // Computes diversity of an *array* of entities based on entropy computations.
    const binCounts = getBinCounts(entities);
    let entropy = 0.0;
    const nEntities = entities.length;
    for (let i=0; i<binCounts.length; i++) {
        if (binCounts[i] > 0) {
            entropy += binCounts[i] * Math.log(binCounts[i] / nEntities);
        }
    }
    return -entropy / (nEntities * Math.log(nEntities + 1));
}

function getBinCounts(entities) { // Computes the number of entities in each bin.
    const MAX_CENTRAL_DISTANCE = 187.798;
    const binCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // We assume we have 10 different groups of colors.
    for (const entity of entities) {
        binCounts[Math.floor(colorDistance(CENTRAL_COLOR, entity) * binCounts.length / MAX_CENTRAL_DISTANCE)] += 1;
    }
    return binCounts;
}