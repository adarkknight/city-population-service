const express = require('express');
const app = express();
const port = '5555';
const populationRouter = require('./routes/population');

app.use(express.json());

app.use('/api', populationRouter);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})

module.exports = app;