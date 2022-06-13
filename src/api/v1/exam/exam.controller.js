const {
  createExam,
  getExamById,
  deleteExamById,
  addQuestionByIdtoExam,

  getAllQuestionById,
  deleteQuestionByIdFromExam,
  getAllUserHasBeenSeenExam,
  updateExamById,

  getHowManySeenExamById,
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
  const addedQuestionById = await addQuestionByIdtoExam(
    request.body.examId,
    request.body.questionId
  );

  return response
    .status(200)
    .json({ result: addedQuestionById, message: 'Soru başarıyla eklendi.' });
}

async function getAllExamController(request, response) {
  return response.status(200).json(response.advancedResults);
}

async function getAllQuestionInExamController(request, response) {
  const allQuestionInExamById = await getAllQuestionById(request.body.examId);

  return response.status(200).json(allQuestionInExamById);
}

async function getAllUserHasBeenSeenController(request, response) {
  const hasBeenSeenUsers = await getAllUserHasBeenSeenExam(request.body.examId);

  return response.status(200).json(hasBeenSeenUsers);
}

async function deleteQuestionByIdFromExamController(request, response) {
  const result = await deleteQuestionByIdFromExam(
    request.body.examId,
    request.body.questionId
  );
  return response.status(200).json(result);
}

async function getHowManyHasBeenSeenController(request, response) {
  const result = await getHowManySeenExamById(request.params.examId);
  return response.status(200).json(result);
}

async function updateExamController(request, response) {
  const examId = request.params.examId;

  const updatedExam = await updateExamById(examId, request.body);

  return response.status(200).json({ message: updatedExam });
}
module.exports = {
  createExamController,
  getExamByIdController,
  deleteExamByIdController,
  addQuestionByIdToExamController,
  getAllExamController,
  getAllQuestionInExamController,
  deleteQuestionByIdFromExamController,
  getAllUserHasBeenSeenController,
  updateExamController,
  getHowManyHasBeenSeenController,
};
