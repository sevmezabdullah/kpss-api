const express = require('express');
const examRouter = express.Router();
const {
  createExamController,
  getExamByIdController,
  deleteExamByIdController,
  addQuestionByIdToExamController,
  getAllExamController,
  getAllQuestionInExamController,
  deleteQuestionByIdFromExamController,
  getAllUserHasBeenSeenController,
  incrementCorrectAnswerCountController,
  incrementWrongAnswerCountController,
} = require('./exam.controller');

examRouter.get('/getAllExam', getAllExamController);
examRouter.get('/getAllQuestionByExamId', getAllQuestionInExamController);
examRouter.get('/getExamById/:id', getExamByIdController);
examRouter.get('/getAllUsersHasBeenSeen', getAllUserHasBeenSeenController);

examRouter.post('/createExam', createExamController);
examRouter.post('/addQuestionById', addQuestionByIdToExamController);
examRouter.post(
  '/incrementCorrectCount',
  incrementCorrectAnswerCountController
);

examRouter.post('/incrementWrongCount', incrementWrongAnswerCountController);

examRouter.delete('/deleteExamById/:id', deleteExamByIdController);
examRouter.delete(
  '/deleteQuestionFromExam',
  deleteQuestionByIdFromExamController
);

module.exports = examRouter;
