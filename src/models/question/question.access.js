//+ QuestionSchema hakkında sorguların olduğu DAL(Data Access Layer) katmanıdır.
const mongoose = require('mongoose');

//+ Soru oluşturan metot
async function createQuestion(question) {}

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
