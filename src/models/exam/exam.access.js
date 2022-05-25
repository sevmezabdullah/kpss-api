//+ ExamSchema hakkında sorguların olduğu DAL(Data Access Layer) katmanıdır.

const mongoose = require('mongoose');

//+ Exam Oluşturan metot
async function createExam(exam) {}

//+ Id bilgisine göre Exam içerisindeki bütün soruları getiren metot
async function getAllQuestionById(examId) {}

//+ Id bilgisine göre Exami getiren metot
async function getExamById(ExamId) {}

//+ Id bilgisine göre gönderilen Exam bilgilerini güncelleyen metot
async function updateExamById(ExamId, newExam) {}

//+ Id bilgisine göre gönderilen soruyu Exame ekleyen metot
async function addQuestionByIdtoExam(ExamId, questionId) {}

//+ Id bilgisine göre Exam içerisinde bulunan soruyu silen metot
async function deleteQuestionByIdFromExam(ExamId, questionId) {}

//+ Id bilgisine göre Exami görüntüleyen kullanıcıların listesini gönderen metot
async function getAllUserHasBeenSeenExam(ExamId) {}

//+ Id bilgisine göre Exami silen metot
async function deleteExamById(ExamId) {}

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

//+ Id bilgisine göre Examin görüntülenme sayısını artıran metot
async function incrementSeenExamById(ExamId) {}

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
  incrementSeenExamById,
};
