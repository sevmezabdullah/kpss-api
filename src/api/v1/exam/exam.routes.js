const express = require('express');
const examRouter = express.Router();
const {
  createExamController,
  getExamByIdController,
  deleteExamByIdController,
  addQuestionByIdToExamController,
} = require('./exam.controller');

examRouter.post('/createExam', createExamController);
examRouter.post('/addQuestionById', addQuestionByIdToExamController);
examRouter.get('/getExamById/:id', getExamByIdController);
examRouter.delete('/deleteExamById/:id', deleteExamByIdController);

module.exports = examRouter;
