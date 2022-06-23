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

const {
  updateErrorMessage,
  getHowManyUserHasBeenSeenErrorMessage,
  deleteQuestionInExamErrorMessage,
  getAllUserHasBeenSeenErrorMessage,
  getExamByIdErrorMessage,
  createExamErrorMessage,
} = '../exam/res/response.messages.js';

async function createExamController(request, response) {
  const title = request.body.title;
  const duration = request.body.duration;
  const category = request.body.category;
  const createdExam = await createExam({ title, duration, category });
  if (createExam != null) {
    return response
      .status(404)
      .json({ error: createExamErrorMessage, success: false });
  }

  return response.status(201).json({ data: createdExam, susscess: true });
}
async function getExamByIdController(request, response) {
  const userId = request.body.userId;
  const exam = await getExamById(request.params.id, userId);

  if (exam) {
    return response.status(200).json({ data: exam, success: true });
  }

  return response
    .status(404)
    .json({ error: getExamByIdErrorMessage, success: false });
}
async function deleteExamByIdController(request, response) {
  const exam = await deleteExamById(request.params.id);
  if (exam) {
    return response.status(200).json({ data: exam, success: true });
  } else {
    return response.status(404).json({
      error: deleteExamByIdErrorMessage,
      success: false,
    });
  }
}

async function addQuestionByIdToExamController(request, response) {
  const addedQuestionById = await addQuestionByIdtoExam(
    request.body.examId,
    request.body.questionId
  );

  if (addQuestionByIdtoExam != null) {
    return response
      .status(200)
      .json({ data: addedQuestionById, success: true });
  } else {
    return response.status(404).json({
      error: addQuestionByIdToExamErrorMessage,
      success: false,
    });
  }
}

async function getAllExamController(request, response) {
  return response.status(200).json(response.advancedResults);
}

async function getAllQuestionInExamController(request, response) {
  const allQuestionInExamById = await getAllQuestionById(request.body.examId);
  if (allQuestionInExamById != null) {
    return response
      .status(200)
      .json({ data: allQuestionInExamById, success: true });
  } else {
    return response.status(404).json({
      error: getAllQuestionInExamErrorMessage,
      success: false,
    });
  }
}

async function getAllUserHasBeenSeenController(request, response) {
  const hasBeenSeenUsers = await getAllUserHasBeenSeenExam(request.body.examId);

  if (hasBeenSeenUsers != null) {
    return response.status(200).json({ data: hasBeenSeenUsers, success: true });
  } else {
    return response.status(404).json({
      error: getAllUserHasBeenSeenErrorMessage,
      success: false,
    });
  }
}

async function deleteQuestionByIdFromExamController(request, response) {
  const result = await deleteQuestionByIdFromExam(
    request.body.examId,
    request.body.questionId
  );

  if (result != null) {
    return response.status(200).json({ data: result, success: true });
  } else {
    return response.status(404).json({
      error: deleteQuestionInExamErrorMessage,
      success: false,
    });
  }
}

async function getHowManyHasBeenSeenController(request, response) {
  const result = await getHowManySeenExamById(request.params.examId);

  if (result != null) {
    return response.status(200).json({ data: result, success: true });
  } else {
    return response.status(404).json({
      error: getHowManyUserHasBeenSeenErrorMessage,
      success: false,
    });
  }
}

async function updateExamController(request, response) {
  const examId = request.params.examId;

  const updatedExam = await updateExamById(examId, request.body);

  if (updateExamById != null) {
    return response.status(200).json({ data: updatedExam, success: true });
  } else {
    return response.status(404).json({
      error: updateErrorMessage,
      success: false,
    });
  }
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
