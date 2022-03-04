const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const CurriculumDTO = require('../../models/dto/curriculum');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('Curriculum Service', () => {
  let curriculumRepositoryMock;
  let CurriculumRepositoryClassMock;
  let service;
  let fakePayload;
  let fakeCurriculum;

  beforeEach(() => {
    fakePayload = {
      name: 'name',
    };

    fakeCurriculum = {
      id: 'curriculumid',
      name: 'string',
    };
    
    curriculumRepositoryMock = {
      getAccounts: sinon.stub(),
      getAll: sinon.stub(),
      getById: sinon.stub(),
      create: sinon.stub(),
      update: sinon.stub(),
      delete: sinon.stub(),
    };

    CurriculumRepositoryClassMock = sinon
      .stub()
      .callsFake(() => curriculumRepositoryMock);

    const CurriculumService = proxyquire(
      '../../services/curriculum',
      {
        '../database/curriculumRepository': CurriculumRepositoryClassMock,
      }
    );

    service = new CurriculumService();
  });

  it('should initialize the repository in constructor', () => {
    expect(CurriculumRepositoryClassMock.called).to.be.true;
  });

  describe('getAll', () => {
    it('should return all curriculum', async() => {
      await curriculumRepositoryMock.getAll.returns({ curriculums: [fakeCurriculum], page: 1, limit: 25, total: 1})
      const res = await expect(service.getAll()).to.be.eventually.fulfilled;
      expect(curriculumRepositoryMock.getAll.called).to.be.true;
      expect(res.data[0]).to.be.deep.equal(new CurriculumDTO(fakeCurriculum));
      expect(res.meta).to.be.deep.equal({ 
        page: 1,
        limit: 25,
        total: 1 });
    })
  });

  describe('createCurriculum', () => {
    it('should throw an error if the curriculum can not be created', async() => {
      await curriculumRepositoryMock.create.returns(null);
      const res = await expect(service.createCurriculum(fakeCurriculum)).to.be.eventually.rejected;
      expect(curriculumRepositoryMock.create.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to create curriculum.');
    })

    it('should create a new curriculum', async() => {
      await curriculumRepositoryMock.create.withArgs(fakePayload).returns(fakeCurriculum)
      const res = await expect(service.createCurriculum(fakePayload)).to.be.eventually.fulfilled;
      expect(curriculumRepositoryMock.create.called).to.be.true;
      expect(res).to.be.deep.equal(new CurriculumDTO(fakeCurriculum));
    })


  });

  describe('getCurriculum', () => {
    it('should throw an error if the curriculum does not exist', async() => {
      await curriculumRepositoryMock.getById.returns(null);
      const res = await expect(service.getCurriculum('curriculumid')).to.be.eventually.rejected;
      expect(curriculumRepositoryMock.getById.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to retrieve curriculum.');
    })

    it('should retrieve the curriculum by id', async() => {
      await curriculumRepositoryMock.getById.returns(fakeCurriculum);
      const res = await expect(service.getCurriculum('curriculumid')).to.be.eventually.fulfilled;
      expect(curriculumRepositoryMock.getById.called).to.be.true;
      expect(res).to.be.deep.equal(new CurriculumDTO(fakeCurriculum));
    })
  });

  describe('updateCurriculum', () => {
    it('should throw an error if the curriculum does not exist', async() => {
      await curriculumRepositoryMock.getById.returns(null)
      const res = await expect(service.updateCurriculum('curriculumid', fakePayload)).to.be.eventually.rejected;
      expect(curriculumRepositoryMock.getById.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to update curriculum.');
    });

    it('should throw an error if the user can not be updated', async() => {
      await curriculumRepositoryMock.getById.returns(fakeCurriculum)
      await curriculumRepositoryMock.update.returns(null)
      const res = await expect(service.updateCurriculum('curriculumid', fakePayload)).to.be.eventually.rejected;
      expect(curriculumRepositoryMock.getById.called).to.be.true;
      expect(curriculumRepositoryMock.update.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to update curriculum.');
    });

    it('should update an existing curriculum', async() => {
      await curriculumRepositoryMock.getById.returns(fakeCurriculum)
      await curriculumRepositoryMock.update.withArgs('curriculumid', fakePayload).returns(fakeCurriculum)
      const res = await expect(service.updateCurriculum('curriculumid', fakePayload)).to.be.eventually.fulfilled;
      expect(curriculumRepositoryMock.getById.called).to.be.true;
      expect(curriculumRepositoryMock.update.called).to.be.true;
      expect(res).to.be.deep.equal(new CurriculumDTO(fakeCurriculum));
    })
  });

  describe('deleteCurricullum', () => {
    it('should throw an exception if the curriculum does not exist', async() => {
      await curriculumRepositoryMock.getById.returns(null)
      const res = await expect(service.deleteCurriculum('curriculumid')).to.be.eventually.rejected;
      expect(curriculumRepositoryMock.getById.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to delete curriculum.');
    })

    it('should throw an exception if the curriculum can not be deleted', async() => {
      await curriculumRepositoryMock.getById.returns(fakeCurriculum);
      await curriculumRepositoryMock.delete.returns(null);
      const res = await expect(service.deleteCurriculum('curriculumid')).to.be.eventually.rejected;
      expect(curriculumRepositoryMock.getById.called).to.be.true;
      expect(curriculumRepositoryMock.delete.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to delete curriculum.');
    })

    it('should delete the curriculum', async() => {
      await curriculumRepositoryMock.getById.returns(fakeCurriculum);
      await curriculumRepositoryMock.delete.returns(fakeCurriculum);
      const res = await expect(service.deleteCurriculum('userid')).to.be.eventually.fulfilled;
      expect(curriculumRepositoryMock.getById.called).to.be.true;
      expect(curriculumRepositoryMock.delete.called).to.be.true;
      expect(res).to.be.deep.equal(new CurriculumDTO(fakeCurriculum));
    });
  })

});