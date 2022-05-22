const { createQuestion } = require('../../../models/question/question.access');

async function createQuestionContoller(request, response) {
  //+ Database Access Layer dan gelen sonuç kullanıcıya dönmek üzere result nesnesine atandı
  const result = await createQuestion(request.body);
  //+ Sonuç içerisinde hata olup olmadığı konrol edildi.
  if (result.error != null) {
    //+ Hata kontrolü için errorChecker fonksiyonuna gönderildi.
    errorChecker(result, response);
  } else {
    //+ Hata yoksa kullanıcıya cevap dönüldü
    return response.status(201).json({ result });
  }
}

function errorChecker(result, response) {
  const errorCode = result.error.code;
  if (errorCode == 11000) {
    return response.json({
      message: `${result.error.keyValue.title} sorusunu tekrarlı şekilde kaydetmeye çalışıyorsunuz.`,
    });
  }
}

module.exports = { createQuestionContoller };
