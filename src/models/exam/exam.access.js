//+ ExamSchema hakkında sorguların olduğu DAL(Data Access Layer) katmanıdır.

const { options } = require('../../api/v1/exam/exam.routes');
const Exam = require('./exam.schema');

//+ Exam Oluşturan metot
async function createExam(exam) {
  const examDB = new Exam(exam);
  try {
    const result = await examDB.save();
    return result;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}
//+ Id bilgisine göre exam getiren metot - sınavı görüntüleyince çalışacak metot
async function getExamById(examId, userId) {
  const exam = await Exam.findByIdAndUpdate(examId, {
    $inc: { seenCount: 1 },
    $push: { userIds: userId },
  });
  return exam;
}

//+ Id bilgisine göre exam silen metot
async function deleteExamById(examId) {
  const exam = await Exam.findByIdAndDelete(examId);
  return exam;
}

//+ Id bilgisine göre gönderilen soruyu exam ekleyen metot
async function addQuestionByIdtoExam(examId, questionId) {
  const exam = await Exam.findByIdAndUpdate(examId, {
    $push: { questionList: questionId },
  });
  return exam;
}

async function getAllExam() {
  const exams = await Exam.find({});
  return exams;
}

//+ Id bilgisine göre exam içerisindeki bütün soruları getiren metot - sınava başlarken çalışacak metot
async function getAllQuestionById(examId) {
  const questionsInExam = await Exam.findOne({ _id: examId })
    .select('questionList')
    .populate('questionList')
    .exec();
  return questionsInExam;
}

//+ Id bilgisine göre exam içerisinde bulunan soruyu silen metot
async function deleteQuestionByIdFromExam(examId, questionId) {
  const result = await Exam.findByIdAndUpdate(examId, {
    $pull: { questionList: questionId },
  });
  return result;
}

//+ Id bilgisine göre exam görüntüleyen kullanıcıların listesini gönderen metot
async function getAllUserHasBeenSeenExam(examId) {
  const allUsersHasBeenSeen = await Exam.findById(examId)
    .select('userIds')
    .populate('userIds')
    .exec();

  return allUsersHasBeenSeen;
}

//+ Id bilgisine göre gönderilen exam bilgilerini güncelleyen metot
async function updateExamById(examId, newExam) {
  const updatedExam = await Exam.findByIdAndUpdate(
    examId,
    { $set: newExam },
    { new: true }
  );
  return updatedExam;
}

//+ Id bilgisine göre exam görüntülenme sayısını veren metot
async function getHowManySeenExamById(examId) {
  const result = await Exam.findById(examId).select('seenCount');
  return result;
}

module.exports = {
  createExam,
  getAllQuestionById,
  getExamById,
  updateExamById,
  addQuestionByIdtoExam,
  deleteQuestionByIdFromExam,
  getAllUserHasBeenSeenExam,
  deleteExamById,
  getHowManySeenExamById,

  getAllExam,
};
