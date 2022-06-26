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

const { protect, authorize } = require('../../../middlewares/auth');
const upload = require('../../../utils/multer');
const advencedResults = require('../../../middlewares/advenced.result');

//! ====== Working =====
examRouter.get(
  '/getAllExam',
  advencedResults(Exam, 'questionList'),
  getAllExamController
);
//! ====== Working =====
examRouter.get(
  '/getAllQuestionByExamId',
  protect,
  getAllQuestionInExamController
);
//! ====== Working =====
examRouter.get('/getExamById/:id', protect, getExamByIdController);
//! ====== Working =====
examRouter.get(
  '/getAllUsersHasBeenSeen',
  protect,
  getAllUserHasBeenSeenController
);

//! ====== Working =====
examRouter.post(
  '/createExam',
  protect,
  upload.single('exam-image'),
  createExamController
);

//! ====== Working =====
examRouter.post(
  '/addQuestionById',
  protect,

  addQuestionByIdToExamController
);

examRouter.put(
  '/updateExam/:examId',
  protect,
  upload.single('exam-image'),
  updateExamController
);

//! ====== Working =====
examRouter.delete('/deleteExamById/:id', deleteExamByIdController);
//! ====== Working =====
examRouter.delete(
  '/deleteQuestionFromExam',
  deleteQuestionByIdFromExamController
);

module.exports = examRouter;
