const chai = require('chai');
const app = require('../../../app');
const chaiHttp = require('chai-http');
const questionURL = '/api/v1/exam';
const { connectDB, disconnectDB } = require('../../../services/db');
const { default: mongoose } = require('mongoose');
chai.should();
chai.use(chaiHttp);

const Question = require('../../../models/exam/exam.schema');

describe('Exam modeline ait CRUD işlemleri', () => {
  //+ her test case inden önce veritabanını açmasını sağlıyoruz
  beforeEach(() => {
    connectDB();
    //+ Teste başlamadan önce veritabanından questions koleksiyonunu siliyoruz.
    //  mongoose.connection.collections.questions.drop();
  });
  //+ her test case inden sonra veritabanını kapatıyoruz.
  afterEach(() => {
    //+ Her testten sonra veritabanı bağlantısını kapatıyoruz.
    disconnectDB();
  });

  it('GET /getAllExam - Bütün sınavları getir..', (done) => {
    chai
      .request(app)
      .get(`${questionURL}/getAllExam`)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});
