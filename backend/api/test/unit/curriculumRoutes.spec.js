const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const CurriculumController = require('../../routes/curriculum/controller');
let fakePayload;
let fakeCurriculum;

describe('Curriculum Routes', () => {
  beforeEach(() => {
    fakePayload = {
      name: 'name',
    };

    fakeCurriculum = {
      id: 'curriculumid',
      name: 'string',
    };
  });

  describe('GET /curriculum', () => {
    it('should get all curriculums', async () => {
      let resSpy = sinon.spy();
      const req = {}; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await CurriculumController.getAll(req,res);
      expect(resSpy.calledOnce).to.equal(true);
    });
  });

  describe('POST /curriculum', () => {
    it('should create a new curriculum', async () => {
      let resSpy = sinon.spy();
      const req = {}; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await CurriculumController.createCurriculum(req, res);
      expect(resSpy.calledOnce).to.be.equal(true);
    });
  });

  describe('GET /curriculum/:curriculumId', () => {
    it('should retrieve a specific curriculum', async () => {
      let resSpy = sinon.spy();
      const req = { params: { curriculumId: 'curriculumId' } }; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await CurriculumController.retrieveCurriculum(req, res);
      expect(resSpy.calledOnce).to.be.equal(true);
    });
  });

  describe('PUT /curriculum/:curriculumId', () => {
    it('should update a specific curriculum', async () => {
      let resSpy = sinon.spy();
      const req = { params: { curriculumId: 'curriculumId' } }; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await CurriculumController.updateCurriculum(req, res);
      expect(resSpy.calledOnce).to.be.equal(true);
    });
  });

  describe('DELETE /curriculum/:curriculumId', () => {
    it('should delete a specific curriculum', async () => {
      let resSpy = sinon.spy();
      const req = {}; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await CurriculumController.deleteCurriculum(req, res);
      expect(resSpy.calledOnce).to.be.equal(true);
    });
  });
});