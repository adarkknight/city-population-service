const populationModel = require('../models/populationModel');

exports.getPopulation = (req, res) => {
    const popData = populationModel.getPopulation(req.params);

    if (!popData) {
        return res.status(400).json({ error: 'Population data cannot be found for that combination' });
    }
    return res.status(200).json({ population: popData.population });
};

exports.updatePopulation = (req, res) => {
    const updateStatus = populationModel.updatePopulation(req);

    if (updateStatus === 400) {
        return res.status(400).json({ error: 'Data cannot be found for that combination' });
    }

    const body = req.body;
    return res.status(updateStatus).json({ message: 'Updated' });
};