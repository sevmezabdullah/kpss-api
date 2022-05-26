const {
  createExam,
  getExamById,
  deleteExamById,
  addQuestionByIdtoExam,
} = require('../../../models/exam/exam.access');

async function createExamController(request, response) {
  const title = request.body.title;
  const duration = request.body.duration;
  const category = request.body.category;
  const createdExam = await createExam({ title, duration, category });
  return response.status(201).json(createdExam);
}
async function getExamByIdController(request, response) {
  const userId = request.body.userId;
  const exam = await getExamById(request.params.id, userId);

  if (exam) {
    return response.status(200).json({ result: exam });
  }

  return response.status(404).json({ result: 'Sonuç bulunamadı.' });
}
async function deleteExamByIdController(request, response) {
  const exam = await deleteExamById(request.params.id);
  if (exam) {
    return response.status(200).json({ exam, message: 'Silindi' });
  } else {
    return response
      .status(404)
      .json({ result: 'Sonuç bulunamadı. Silme işlemi başarısız' });
  }
}

async function addQuestionByIdToExamController(request, response) {
  console.log(request.body);
  const { questionInformation } = request.body;
  const addedQuestionById = await addQuestionByIdtoExam(
    '628fc4df6e46339e36ea75e6',
    '628fc3d957766900e2068128'
  );

  return response
    .status(200)
    .json({ result: addedQuestionById, message: 'Soru başarıyla eklendi.' });
}

module.exports = {
  createExamController,
  getExamByIdController,
  deleteExamByIdController,
  addQuestionByIdToExamController,
};
