//+ TestSchema hakkında sorguların olduğu DAL(Data Access Layer) katmanıdır.

const mongoose = require('mongoose');

//+ Test Oluşturan metot
async function createTest(test) {}

//+ Id bilgisine göre test içerisindeki bütün soruları getiren metot
async function getAllQuestionById(testId) {}

//+ Id bilgisine göre testi getiren metot
async function getTestById(testId) {}

//+ Id bilgisine göre gönderilen test bilgilerini güncelleyen metot
async function updateTestById(testId, newTest) {}

//+ Id bilgisine göre gönderilen soruyu teste ekleyen metot
async function addQuestionByIdtoTest(testId, questionId) {}

//+ Id bilgisine göre test içerisinde bulunan soruyu silen metot
async function deleteQuestionByIdFromTest(testId, questionId) {}

//+ Id bilgisine göre testi görüntüleyen kullanıcıların listesini gönderen metot
async function getAllUserHasBeenSeenTest(testId) {}

//+ Id bilgisine göre testi silen metot
async function deleteTestById(testId) {}

//+ Id bilgisine göre testin görüntülenme sayısını veren metot
async function getHowManySeenTestById(testId) {}

//+ Id bilgisine göre testin toplam doğru cevaplanma sayısını veren metot
async function getHowManyCorrectAnswerTestById(testId) {}

//+ Id bilgisine göre testin toplam yanlış cevaplanma sayısını veren metot
async function getHowManyWrongAnswerTestById(testId) {}

//+ Id bilgisine göre testteki soruların toplam doğru cevaplanma sayısını artıran metot
async function incrementCorrectAnswerCount(testId) {}

//+ Id bilgisine göre testteki soruların toplam yanlış cevaplanma sayısını artıran metot
async function incrementWrongAnswerCount(testId) {}

//+ Id bilgisine göre testin görüntülenme sayısını artıran metot
async function incrementSeenTestById(testId) {}

module.exports = {
  createTest,
  getAllQuestionById,
  getTestById,
  updateTestById,
  addQuestionByIdtoTest,
  deleteQuestionByIdFromTest,
  getAllUserHasBeenSeenTest,
  deleteTestById,
  getHowManySeenTestById,
  getHowManyCorrectAnswerTestById,
  getHowManyWrongAnswerTestById,
  incrementCorrectAnswerCount,
  incrementWrongAnswerCount,
  incrementSeenTestById,
};
