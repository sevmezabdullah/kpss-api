//+ Sorularla ilgili testlerin yazıldığı test dosyasıdır.
const chai = require('chai');
const app = require('../../../app');
const chaiHttp = require('chai-http');
const questionURL = '/api/v1/question';

const { connectDB, disconnectDB } = require('../../../services/db');

chai.should();
chai.use(chaiHttp);

describe('Question modeline ait CRUD işlemleri', () => {
  const question = {
    title: 'Türkiyenin başkenti neresidir ? ',
    answerList: ['Ankara', 'İstanbul', 'Antalya', 'Iğdır'],
    correctAnswerIndex: 0,
    category: 'Coğrafya',
  };
  beforeEach(async () => {
    connectDB(false);
  });
  afterEach(() => {
    disconnectDB(false);
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
  // beforeAll(async () => {
  //   await connectDB();
  // });
  // afterAll(async () => {
  //   await disconnectDB();
  // });

  // test('/POST Create Question', async () => {
  //   const response = await request(app)
  //     .post(`${questionURL}/createQuestion`)
  //     .send(question);
  //   expect(response.status).toBe(200);
  // });
  // test('GET App', async () => {
  //   console.log(questionURL);
  //   const response = await request(app).get('/');
  //   expect(response.status).toBe(200);
  // });
});
