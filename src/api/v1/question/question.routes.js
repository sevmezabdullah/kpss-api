const express = require('express');
const questionRouter = express.Router();
const asyncHandler = require('../../../middlewares/async');
const Question = require('../../../models/question/question.schema');
const { protect, authorize } = require('../../../middlewares/auth');

const {
  createQuestionContoller,
  getAllQuestionController,
  deleteQuestionController,
  updateQuestionByIdController,
  getQuestionByIdController,

  getHowManyWrongAnswerQuestionByIdController,
  getHowManyCorrectAnswerQuestionByIdController,
} = require('./question.controller');

const advancedResults = require('../../../middlewares/advenced.result');

const upload = require('../../../utils/multer');

questionRouter.post(
  '/createQuestion',
  protect,
  authorize('admin'),
  upload.single('question-image'),
  asyncHandler(createQuestionContoller)
);

questionRouter.get(
  '/getAllQuestion',
  advancedResults(Question, 'title'),
  getAllQuestionController
);
questionRouter.delete('/deleteById/:id', deleteQuestionController);
questionRouter.put('/updateQuestion/:id', updateQuestionByIdController);
questionRouter.get('/getQuestionById/:id', getQuestionByIdController);

questionRouter.get(
  '/getHowManyWrongCount/:questionId',
  getHowManyWrongAnswerQuestionByIdController
);
questionRouter.get(
  '/getHowManyCorrectCount/:questionId',
  getHowManyCorrectAnswerQuestionByIdController
);

module.exports = questionRouter;
