const express = require('express');
const examRouter = express.Router();
const Exam = require('../../../models/exam/exam.schema');
const {
  createExamController,
  getExamByIdController,
  deleteExamByIdController,
  addQuestionByIdToExamController,
  getAllExamController,
  getAllQuestionInExamController,
  deleteQuestionByIdFromExamController,
  getAllUserHasBeenSeenController,
  updateExamController,
} = require('./exam.controller');

const advencedResults = require('../../../middlewares/advenced.result');

//! ====== Working =====
examRouter.get('/getAllExam', advencedResults(Exam), getAllExamController);
//! ====== Working =====
examRouter.get('/getAllQuestionByExamId', getAllQuestionInExamController);
//! ====== Working =====
examRouter.get('/getExamById/:id', getExamByIdController);
//! ====== Working =====
examRouter.get('/getAllUsersHasBeenSeen', getAllUserHasBeenSeenController);

//! ====== Working =====
examRouter.post('/createExam', createExamController);

//! ====== Working =====
examRouter.post('/addQuestionById', addQuestionByIdToExamController);

examRouter.put('/updateExam/:examId', updateExamController);

//! ====== Working =====
examRouter.delete('/deleteExamById/:id', deleteExamByIdController);
//! ====== Working =====
examRouter.delete(
  '/deleteQuestionFromExam',
  deleteQuestionByIdFromExamController
);

module.exports = examRouter;
