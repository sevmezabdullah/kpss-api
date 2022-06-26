const {
  createQuestion,
  deleteQuestionById,
  updateQuestionById,
  getQuestionById,
  getHowManyCorrectAnswerQuestionById,
  getHowManyWrongAnswerQuestionById,
} = require('../../../models/question/question.access');

const fs = require('fs');
const path = require('path');
const {
  deleteQuestionErrorMessage,
  notFoundQuestionErrorMessage,
  notFoundCorrectErrorMessage,
  notFoundWrongErrorMessage,
} = require('../question/res/response.messages');
const config = require('../../../config/config');

async function createQuestionContoller(request, response) {
  //+ Database Access Layer dan gelen sonuç kullanıcıya dönmek üzere result nesnesine atandı
  const result = await createQuestion(request.body);
  const imageUrl = uploadImage(request, result.id);
  await updateQuestionById(result.id, { questionImage: imageUrl });
  //+ Sonuç içerisinde hata olup olmadığı konrol edildi.
  if (result.error != null) {
    //+ Hata kontrolü için errorChecker fonksiyonuna gönderildi.
    return response.status(404).json({ error: result.error, success: false });
  } else {
    //+ Hata yoksa kullanıcıya cevap dönüldü
    return response.status(201).json({ data: result, success: true });
  }
}

function uploadImage(request, id) {
  const file = request.file;
  const fileExt = file.originalname.split('.');
  const fileType = fileExt[fileExt.length - 1];
  console.log(file.originalname);
  console.log(fileType);

  const oldImagePath = path.join(__dirname, '../../../../', file.path);

  const newImagePath = path.join(
    __dirname,
    '../../../../uploads/questions',
    id + '.' + fileType
  );
  fs.rename(oldImagePath, newImagePath, (err) => {});

  return (
    'http://' +
    request.hostname +
    `:${config.PORT}/uploads/questions/` +
    id +
    '.' +
    fileType
  );
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
  let newQuestion = request.body;

  if (request.file != null) {
    const imageUrl = uploadImage(request, request.params.id);
    newQuestion.questionImage = imageUrl;
  }
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
