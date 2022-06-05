//+ QuestionSchema hakkında sorguların olduğu DAL(Data Access Layer) katmanıdır.
const Question = require('./question.schema');

//+ Soru oluşturan metot
async function createQuestion(question) {
  const questionDB = new Question(question);
  const result = await questionDB.save();
  return result;
}

//+ Veritabanından soru silen metot
async function deleteQuestionById(id) {
  const result = await Question.findByIdAndDelete(id);
  return result;
}

//+ Bütün soruları listeleyen metot
async function getAllQuestion() {
  const result = await Question.find();
  return result;
}

//+ veritabanındaki soruyu güncelleyen metot
async function updateQuestionById(id, newQuestionParams) {
  try {
    const result = await Question.findByIdAndUpdate(id, newQuestionParams);
    return result;
  } catch (error) {
    if (error) {
      return { result: error };
    }
  }
}

function errorManager(error, message, errorCode) {
  if (errorCode) {
    return { error: error, message: message, errorCode: errorCode };
  }
  return { error: error, message: message, errorCode: 404 };
}
//+ Id bilgisine göre soruyu getiren metot
async function getQuestionById(id) {
  const result = await Question.findByIdAndUpdate(id, {
    $inc: { seenCount: 1 },
  });
  return result;
}

//+ Id bilgisine göre question toplam doğru cevaplanma sayısını veren metot
async function getHowManyCorrectAnswerQuestionById(questionId) {
  const result = await Question.findById(questionId).select('correctCount');
  return result;
}

//+ Id bilgisine göre question toplam yanlış cevaplanma sayısını veren metot
async function getHowManyWrongAnswerQuestionById(questionId) {
  const result = await Question.findById(questionId).select('wrongCount');
  return result;
}

module.exports = {
  createQuestion,
  getAllQuestion,
  deleteQuestionById,
  updateQuestionById,
  getQuestionById,

  getHowManyCorrectAnswerQuestionById,
  getHowManyWrongAnswerQuestionById,
};
