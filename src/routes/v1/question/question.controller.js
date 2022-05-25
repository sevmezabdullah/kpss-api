const {
  createQuestion,
  deleteQuestionById,
  getAllQuestion,
} = require('../../../models/question/question.access');

async function createQuestionContoller(request, response) {
  //+ Database Access Layer dan gelen sonuç kullanıcıya dönmek üzere result nesnesine atandı
  const result = await createQuestion(request.body);
  //+ Sonuç içerisinde hata olup olmadığı konrol edildi.
  if (result.error != null) {
    //+ Hata kontrolü için errorChecker fonksiyonuna gönderildi.
    errorChecker(result, response);
  } else {
    //+ Hata yoksa kullanıcıya cevap dönüldü
    return response
      .status(201)
      .json({ result, message: `${result.title} sorusu eklendi.` });
  }
}

//+ id bilgisine göre questions koleksiyonundan soru siliyoruz
// @Params : [id]
// !Body : []
// @Auth : [admin]
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
// @Auth : [admin,user]
async function getAllQuestionController(request, response) {
  const result = await getAllQuestion();
  if (result.error != null) {
    return response.status(404).json({ error: result.error });
  } else {
    return response
      .status(200)
      .json({ result, message: 'Bütün sorular başarıyla sorgulandı.' });
  }
}

function errorChecker(result, response) {
  const errorCode = result.error.code;

  if (result.error.name == 'ValidationError') {
    return response.status(404).json({
      error:
        'Soruyu kaydedebilmek için gerekli tüm verileri girdiğinizden emin olun.',
    });
  }

  if (errorCode == 11000) {
    return response.status(404).json({
      message: `${result.error.keyValue.title} sorusunu tekrarlı şekilde kaydetmeye çalışıyorsunuz.`,
    });
  }
}

module.exports = {
  createQuestionContoller,
  deleteQuestionController,
  getAllQuestionController,
};
