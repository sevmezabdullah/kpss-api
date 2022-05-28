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
} = require('./exam.controller');

examRouter.get('/getAllExam', getAllExamController);
examRouter.get('/getAllQuestionByExamId', getAllQuestionInExamController);
examRouter.get('/getExamById/:id', getExamByIdController);

examRouter.post('/createExam', createExamController);
examRouter.post('/addQuestionById', addQuestionByIdToExamController);

examRouter.delete('/deleteExamById/:id', deleteExamByIdController);
examRouter.delete(
  '/deleteQuestionFromExam',
  deleteQuestionByIdFromExamController
);

module.exports = examRouter;
