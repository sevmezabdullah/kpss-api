//+ ExamSchema hakkında sorguların olduğu DAL(Data Access Layer) katmanıdır.

const mongoose = require('mongoose');

//+ Exam Oluşturan metot
async function createExam(Exam) {}

//+ Id bilgisine göre exam içerisindeki bütün soruları getiren metot
async function getAllQuestionById(ExamId) {}

//+ Id bilgisine göre exam getiren metot
async function getExamById(ExamId) {}

//+ Id bilgisine göre gönderilen exam bilgilerini güncelleyen metot
async function updateExamById(ExamId, newExam) {}

//+ Id bilgisine göre gönderilen soruyu exam ekleyen metot
async function addQuestionByIdtoExam(ExamId, questionId) {}

//+ Id bilgisine göre exam içerisinde bulunan soruyu silen metot
async function deleteQuestionByIdFromExam(ExamId, questionId) {}

//+ Id bilgisine göre exam görüntüleyen kullanıcıların listesini gönderen metot
async function getAllUserHasBeenSeenExam(ExamId) {}

//+ Id bilgisine göre exam silen metot
async function deleteExamById(ExamId) {}

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
