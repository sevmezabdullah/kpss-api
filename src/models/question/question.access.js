//+ QuestionSchema hakkında sorguların olduğu DAL(Data Access Layer) katmanıdır.
const Question = require('./question.schema');

//+ Soru oluşturan metot
async function createQuestion(question) {
  const questionDB = new Question(question);
  try {
    const result = await questionDB.save();
    return result;
  } catch (error) {
    return { error: error };
  }
}

//+ Veritabanından soru silen metot
async function deleteQuestionById(id) {
  try {
    const result = await Question.findByIdAndDelete(id);
    return result;
  } catch (error) {
    if (error) {
      return { error: error };
    }
  }
}

//+ Bütün soruları listeleyen metot
async function getAllQuestion() {
  try {
    const result = await Question.find();
    return result;
  } catch (error) {
    if (error) {
      return { result: error };
    }
  }
}

//+ veritabanındaki soruyu güncelleyen metot
async function updateQuestionById(id, newQuestionParams) {}

//+ Id bilgisine göre soruyu getiren metot
async function getQuestionById(id) {}

//+ Id bilgisine göre sorunun görüntülenme sayısını artıran metot
async function incrementSeenCount(id) {}

module.exports = {
  createQuestion,
  getAllQuestion,
  deleteQuestionById,
  updateQuestionById,
  getQuestionById,
  incrementSeenCount,
};
