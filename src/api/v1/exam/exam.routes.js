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
} = require('./exam.controller');

//! ====== Working =====
examRouter.get('/getAllExam', getAllExamController);
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

//! ====== Working =====
examRouter.delete('/deleteExamById/:id', deleteExamByIdController);
//! ====== Working =====
examRouter.delete(
  '/deleteQuestionFromExam',
  deleteQuestionByIdFromExamController
);

module.exports = examRouter;
