const {
  createQuestion,
  deleteQuestionById,
  updateQuestionById,
  getQuestionById,
  getHowManyCorrectAnswerQuestionById,
  getHowManyWrongAnswerQuestionById,
} = require('../../../models/question/question.access');

async function createQuestionContoller(request, response) {
  //+ Database Access Layer dan gelen sonuç kullanıcıya dönmek üzere result nesnesine atandı
  const result = await createQuestion(request.body);

  //+ Sonuç içerisinde hata olup olmadığı konrol edildi.
  if (result.error != null) {
    //+ Hata kontrolü için errorChecker fonksiyonuna gönderildi.
    return response.status(404).json({ error: result.error });
  } else {
    //+ Hata yoksa kullanıcıya cevap dönüldü
    return response
      .status(201)
      .json({ result, message: `${result.title} sorusu eklendi.` });
  }
}

//+ id bilgisine göre questions koleksiyonundan soru siliyoruz
// @Params : [id]
//! Body : []
//+ Auth : [admin]
async function deleteQuestionController(request, response) {
  const id = request.params.id;
  const result = await deleteQuestionById(id);
  if (result != null) {
    return response
      .status(200)
      .json({ result, message: `${result.title} sorusu silindi.` });
  } else {
    return response.status(404).json({ message: 'Silinecek soru bulunamadı.' });
  }
}

//+ Bütün soruları listelemek istediğimizde kullacağımız metot.

// @Params : []
// !Body : []
//+ Auth : [admin,user]
async function getAllQuestionController(request, response) {
  return response.status(200).json(response.advancedResults);
}

async function updateQuestionByIdController(request, response) {
  const newQuestion = request.body;
  const updatedQuestion = await updateQuestionById(
    request.params.id,
    newQuestion
  );
  return response
    .status(200)
    .json({ updatedQuestion, message: 'Güncelleme tamamlandı.' });
}

async function getQuestionByIdController(request, response) {
  const question = await getQuestionById(request.params.id);
  if (question != null) {
    return response.status(200).json(question);
  } else {
    return response.status(404).json({ message: 'Soru bulunamadı' });
  }
}

async function getHowManyWrongAnswerQuestionByIdController(request, response) {
  const result = await getHowManyWrongAnswerQuestionById(
    request.params.questionId
  );
  return response.status(200).json(result);
}

async function getHowManyCorrectAnswerQuestionByIdController(
  request,
  response
) {
  const result = await getHowManyCorrectAnswerQuestionById(
    request.params.questionId
  );
  return response.status(200).json(result);
}

module.exports = {
  createQuestionContoller,
  deleteQuestionController,
  getAllQuestionController,
  updateQuestionByIdController,
  getQuestionByIdController,

  getHowManyWrongAnswerQuestionByIdController,
  getHowManyCorrectAnswerQuestionByIdController,
};
