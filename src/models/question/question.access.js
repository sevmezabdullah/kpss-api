//+ QuestionSchema hakkında sorguların olduğu DAL(Data Access Layer) katmanıdır.
const Question = require('./question.schema');
const ErrorResponse = require('../../utils/error.message');
//+ Soru oluşturan metot
async function createQuestion(question) {
  const questionDB = new Question(question);
  try {
    const result = await questionDB.save();
    return result;
  } catch (error) {
    return errorManager(error, 'Soru oluşturulurken hata oluştu.', 400);
  }
}

//+ Veritabanından soru silen metot
async function deleteQuestionById(id) {
  try {
    const result = await Question.findByIdAndDelete(id, (err, doc) => {
      if (err) {
        return errorManager(
          err,
          `${id} numaralı soru silinirken hata oluştu.`,
          404
        );
      }
    });
    return result;
  } catch (error) {
    if (error) {
      return { error: error };
    }
  }
}

//+ Bütün soruları listeleyen metot
async function getAllQuestion() {
  const result = await Question.find();
  return result;
}

async function checkUserAnswer(questionId, choosenIndex) {
  const question = await Question.findById(questionId);
  if (question.correctAnswerIndex === choosenIndex) {
    await Question.findByIdAndUpdate(questionId, { $inc: { correctCount: 1 } });
    return { message: 'Cevap Doğru' };
  } else {
    await Question.findByIdAndUpdate(questionId, { $inc: { wrongCount: 1 } });
    return { message: 'Cevap Yanlış' };
  }

  //  return question;
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
  try {
    const result = await Question.findById(id);
    return result;
  } catch (err) {
    if (err) {
      return { result: err };
    }
  }
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

//+ Id bilgisine göre sorunun görüntülenme sayısını artıran metot
async function incrementSeenCount(id) {}

module.exports = {
  createQuestion,
  getAllQuestion,
  deleteQuestionById,
  updateQuestionById,
  getQuestionById,
  incrementSeenCount,
  checkUserAnswer,
  getHowManyCorrectAnswerQuestionById,
  getHowManyWrongAnswerQuestionById,
};
