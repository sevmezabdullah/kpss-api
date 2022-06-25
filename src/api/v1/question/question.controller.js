const {
  createQuestion,
  deleteQuestionById,
  updateQuestionById,
  getQuestionById,
  getHowManyCorrectAnswerQuestionById,
  getHowManyWrongAnswerQuestionById,
} = require('../../../models/question/question.access');

const {
  deleteQuestionErrorMessage,
  notFoundQuestionErrorMessage,
  notFoundCorrectErrorMessage,
  notFoundWrongErrorMessage,
} = require('../question/res/response.messages');

async function createQuestionContoller(request, response) {
  //+ Database Access Layer dan gelen sonuç kullanıcıya dönmek üzere result nesnesine atandı
  const result = await createQuestion(request.body);

  console.log(request.file);
  //+ Sonuç içerisinde hata olup olmadığı konrol edildi.
  if (result.error != null) {
    //+ Hata kontrolü için errorChecker fonksiyonuna gönderildi.
    return response.status(404).json({ error: result.error, success: false });
  } else {
    //+ Hata yoksa kullanıcıya cevap dönüldü
    return response.status(201).json({ data: result, success: true });
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
    return response.status(200).json({ data: result, success: true });
  } else {
    return response
      .status(404)
      .json({ error: deleteQuestionErrorMessage, success: false });
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
  if (updateQuestionById != null) {
    return response.status(200).json({ data: updatedQuestion, success: true });
  } else {
    return response
      .status(404)
      .json({ error: updatedQuestion, success: false });
  }
}

async function getQuestionByIdController(request, response) {
  const question = await getQuestionById(request.params.id);
  if (question != null) {
    return response.status(200).json({ data: question, success: true });
  } else {
    return response
      .status(404)
      .json({ error: notFoundQuestionErrorMessage, success: false });
  }
}

async function getHowManyWrongAnswerQuestionByIdController(request, response) {
  const result = await getHowManyWrongAnswerQuestionById(
    request.params.questionId
  );

  if (result != null) {
    return response.status(200).json({ data: result, success: true });
  } else {
    return response.status(404).json({
      error: notFoundWrongErrorMessage,
      success: false,
    });
  }
}

async function getHowManyCorrectAnswerQuestionByIdController(
  request,
  response
) {
  const result = await getHowManyCorrectAnswerQuestionById(
    request.params.questionId
  );

  if (result != null) {
    return response.status(200).json({ data: result, success: true });
  } else {
    return response.status(404).json({
      error: notFoundCorrectErrorMessage,
      success: false,
    });
  }
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
