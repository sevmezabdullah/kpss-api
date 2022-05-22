//+ Sorularla ilgili testlerin yazıldığı test dosyasıdır.
const chai = require('chai');
const app = require('../../../app');
//+ Http isteklerini yapabilmek için chai-http yi import ediyoruz
const chaiHttp = require('chai-http');
const questionURL = '/api/v1/question';
//+ test case lerinden önce veritabanı açma ve kapatma işlemleri için connectDB ve disconnectDB yi import ediyoruz
const { connectDB, disconnectDB } = require('../../../services/db');
//+ chai için kullanacağımız assertion konseptini seçiyoruz [expect,should,assertion] biz shouldu seçtik
chai.should();
//+ http isteğini yapabilmek için chainin middleware katmanına chai http özelliğini ekliyoruz.
chai.use(chaiHttp);

describe('Question modeline ait CRUD işlemleri', () => {
  const question = {
    title: 'Türkiyenin başkenti neresidir ? ',
    answerList: ['Ankara', 'İstanbul', 'Antalya', 'Iğdır'],
    correctAnswerIndex: 0,
    category: 'Coğrafya',
  };
  //+ her test case inden önce veritabanını açmasını sağlıyoruz
  beforeEach(() => {
    connectDB();
  });
  //+ her test case inden sonra veritabanını kapatıyoruz.
  afterEach(() => {
    disconnectDB();
  });
  it('POST /createQuestion - soru oluştur.', (done) => {
    chai
      .request(app)
      .post(`${questionURL}/createQuestion`)
      .send(question)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it('GET /questionById - ID bilgisine göre soru getir.', (done) => {
    chai
      .request(app)
      .get(`/`)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});
