//+ ExamSchema hakkında sorguların olduğu DAL(Data Access Layer) katmanıdır.

const Exam = require('./exam.schema');

//+ Exam Oluşturan metot
async function createExam(exam) {
  const examDB = new Exam(exam);
  try {
    const result = await examDB.save();
    return result;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}

//+ Id bilgisine göre exam içerisindeki bütün soruları getiren metot
async function getAllQuestionById(examId) {}

//+ Id bilgisine göre exam getiren metot
async function getExamById(examId, userId) {
  const exam = await Exam.findByIdAndUpdate(examId, {
    $inc: { seenCount: 1 },
    $push: { userIds: userId },
  });
  return exam;
}

//+ Id bilgisine göre gönderilen exam bilgilerini güncelleyen metot
async function updateExamById(ExamId, newExam) {}

//+ Id bilgisine göre gönderilen soruyu exam ekleyen metot
async function addQuestionByIdtoExam(ExamId, questionId) {}

//+ Id bilgisine göre exam içerisinde bulunan soruyu silen metot
async function deleteQuestionByIdFromExam(ExamId, questionId) {}

//+ Id bilgisine göre exam görüntüleyen kullanıcıların listesini gönderen metot
async function getAllUserHasBeenSeenExam(examId) {}

//+ Id bilgisine göre exam silen metot
async function deleteExamById(examId) {
  const exam = await Exam.findByIdAndDelete(examId);
  return exam;
}

//+ Id bilgisine göre exam görüntülenme sayısını veren metot
async function getHowManySeenExamById(ExamId) {}

//+ Id bilgisine göre exam toplam doğru cevaplanma sayısını veren metot
async function getHowManyCorrectAnswerExamById(ExamId) {}

//+ Id bilgisine göre exam toplam yanlış cevaplanma sayısını veren metot
async function getHowManyWrongAnswerExamById(ExamId) {}

//+ Id bilgisine göre exam soruların toplam doğru cevaplanma sayısını artıran metot
async function incrementCorrectAnswerCount(ExamId) {}

//+ Id bilgisine göre exam soruların toplam yanlış cevaplanma sayısını artıran metot
async function incrementWrongAnswerCount(ExamId) {}

//+ Id bilgisine göre exam görüntülenme sayısını artıran metot

//+ Id bilgisine göre Exam içerisindeki bütün soruları getiren metot
async function getAllQuestionById(examId) {}

//+ Id bilgisine göre gönderilen Exam bilgilerini güncelleyen metot
async function updateExamById(ExamId, newExam) {}

//+ Id bilgisine göre gönderilen soruyu Exame ekleyen metot
async function addQuestionByIdtoExam(ExamId, questionId) {}

//+ Id bilgisine göre Exam içerisinde bulunan soruyu silen metot
async function deleteQuestionByIdFromExam(ExamId, questionId) {}

//+ Id bilgisine göre Exami görüntüleyen kullanıcıların listesini gönderen metot
async function getAllUserHasBeenSeenExam(ExamId) {}

//+ Id bilgisine göre Examin görüntülenme sayısını veren metot
async function getHowManySeenExamById(ExamId) {}

//+ Id bilgisine göre Examin toplam doğru cevaplanma sayısını veren metot
async function getHowManyCorrectAnswerExamById(ExamId) {}

//+ Id bilgisine göre Examin toplam yanlış cevaplanma sayısını veren metot
async function getHowManyWrongAnswerExamById(ExamId) {}

//+ Id bilgisine göre Examteki soruların toplam doğru cevaplanma sayısını artıran metot
async function incrementCorrectAnswerCount(ExamId) {}

//+ Id bilgisine göre Examteki soruların toplam yanlış cevaplanma sayısını artıran metot
async function incrementWrongAnswerCount(ExamId) {}

module.exports = {
  createExam,
  getAllQuestionById,
  getExamById,
  updateExamById,
  addQuestionByIdtoExam,
  deleteQuestionByIdFromExam,
  getAllUserHasBeenSeenExam,
  deleteExamById,
  getHowManySeenExamById,
  getHowManyCorrectAnswerExamById,
  getHowManyWrongAnswerExamById,
  incrementCorrectAnswerCount,
  incrementWrongAnswerCount,
};
