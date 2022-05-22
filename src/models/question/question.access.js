//+ QuestionSchema hakkında sorguların olduğu DAL(Data Access Layer) katmanıdır.
const Question = require('./question.schema');

//+ Soru oluşturan metot
async function createQuestion(question) {
  const questionDB = new Question(question);
  try {
    const result = await questionDB.save();
    return `${result.title} sorusu başarıyla eklendi.`;
  } catch (error) {
    return { error };
  }
}

//+ Veritabanından soru silen metot
async function deleteQuestionById(id) {}

//+ veritabanındaki soruyu güncelleyen metot
async function updateQuestionById(id, newQuestionParams) {}

//+ Id bilgisine göre soruyu getiren metot
async function getQuestionById(id) {}

//+ Id bilgisine göre sorunun görüntülenme sayısını artıran metot
async function incrementSeenCount(id) {}

module.exports = {
  createQuestion,
  deleteQuestionById,
  updateQuestionById,
  getQuestionById,
  incrementSeenCount,
};
