const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const expect = chai.expect;
const sinon = require('sinon');
const populationModel = require('../../models/populationModel');
chai.use(chaiHttp);

describe('Population API', () => {
  describe('GET /population/state/:state/city/:city', () => {
    it('should return population when valid city and state are provided', (done) => {
      const city = 'Des Moines';
      const state = 'Iowa';
      chai.request(app)
        .get(`/api/population/state/${state}/city/${city}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.key(["population"]);
          done();
        });
    });

    it('should return status 400 when invalid city and state are provided', (done) => {
      const city = 'CityPlace';
      const state = 'Nowhere';
      chai.request(app)
        .get(`/api/population/state/${state}/city/${city}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.eql('Population data cannot be found for that combination');
          done();
        });
    });
  });

  describe('PUT /population/state/:state/city/:city', () => {
    it('should return 200 when updating an existing city and state population data', (done) => {
      const mockData = [
        {
          "city": "Riverside",
          "state": "Wyoming",
          "population": "63"
        },
        {
          "city": "Van Tassell",
          "state": "Wyoming",
          "population": "23"
        },
        {
          "city": "Lost Springs",
          "state": "Wyoming",
          "population": "4"
        }
      ]
      const getPopulationDataStub = sinon.stub(populationModel, 'getPopulation').resolves(mockData);
      const updatePopulationDataStub = sinon.stub(populationModel, 'updatePopulationData').resolves(true);
      const mockPopulationModel = sinon.stub(populationModel, 'updatePopulation').returns(200);
      const city = 'Riverside';
      const state = 'Wyoming';
      chai.request(app)
        .put(`/api/population/state/${state}/city/${city}`)
        .send({
          population: '100',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.eq('Updated');
          mockPopulationModel.restore()
          getPopulationDataStub.restore()
          updatePopulationDataStub.restore()

          done();
        });
    });

    it('should return 201 when city and state population data does not exist', (done) => {
      const mockData = [
        {
          "city": "Riverside",
          "state": "Wyoming",
          "population": "63"
        },
        {
          "city": "Van Tassell",
          "state": "Wyoming",
          "population": "23"
        },
        {
          "city": "Lost Springs",
          "state": "Wyoming",
          "population": "4"
        }
      ]
      const getPopulationDataStub = sinon.stub(populationModel, 'getPopulation').resolves(mockData);
      const updatePopulationDataStub = sinon.stub(populationModel, 'updatePopulationData').resolves(true);
      const mockPopulationModel = sinon.stub(populationModel, 'updatePopulation').returns(201);
      const city = 'Anytown';
      const state = 'Anystate';
      chai.request(app)
        .put(`/api/population/state/${state}/city/${city}`)
        .send({
          population: '100',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.message).to.eq('Updated');
          mockPopulationModel.restore()
          getPopulationDataStub.restore()
          updatePopulationDataStub.restore()
          done();
        });
    });
  });
});