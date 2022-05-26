const {
  createExam,
  getExamById,
  deleteExamById,
} = require('../../../models/exam/exam.access');

async function createExamController(request, response) {
  const title = request.body.title;
  const duration = request.body.duration;
  const category = request.body.category;
  const createdExam = await createExam({ title, duration, category });
  return response.status(201).json(createdExam);
}
async function getExamByIdController(request, response) {
  const exam = await getExamById(request.params.id);
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
module.exports = {
  createExamController,
  getExamByIdController,
  deleteExamByIdController,
};
