const { readFileSync, writeFileSync } = require('fs');
const { formatText } = require('../helpers/helpers');
const filePath = './data/populationData.json';


const getPopulationData = () => {
    try {
        const importedData = readFileSync(filePath, 'utf-8');
        return JSON.parse(importedData);
    } catch (e) {
        return e;
    }
};

const updatePopulationData = (data) => {
    writeFileSync(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return false;
        }
    });
    return true;
};


const getPopulation = (data) => {
    const state = formatText(data.state);
    const city = formatText(data.city);
    const populationData = getPopulationData();
    const popData = populationData.find(pop => pop.state === state && pop.city === city);
    return popData;
};

const updatePopulation = (data) => {
    const state = formatText(data.params.state);
    const city = formatText(data.params.city);
    const populationData = getPopulationData();
    const index = populationData.findIndex(pop => pop.state === state && pop.city === city);
    let updatedPopulation;
    let status;

    if (index != -1) {
        updatedPopulation = {
            'city': city,
            'state': state,
            'population': data.body.population,
        }
        populationData[index] = updatedPopulation;
        const update = updatePopulationData(populationData);
        if (!update) {
            return status = 400;
        }
        return status = 200;
    } else {
        updatedPopulation = {
            'city': city,
            'state': state,
            'population': data.body.population,
        }
        populationData.push(updatedPopulation);
        const update = updatePopulationData(populationData);
        if (!update) {
            return status = 400;
        }
        return status = 201;
    }
    
};


module.exports = {
    getPopulation,
    updatePopulation,
    getPopulationData,
    updatePopulationData,
};
