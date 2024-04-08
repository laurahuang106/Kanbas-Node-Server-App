import model from "./model.js";

// actions for quizzes
export const createQuiz = async (courseId, quiz) => {
  const quizData = { ...quiz, course: courseId };
  return model.create(quizData); 
};
export const findAllQuizs = async(courseId) => model.find({ course: courseId });
export const findQuizById = async(quizId) => model.findById(quizId);
export const updateQuiz = async(quizId, quiz) =>  model.updateOne({ _id: quizId }, { $set: quiz });
export const deleteQuiz = async(quizId) => model.deleteOne({ _id: quizId });

// actions for questions
export const createQuestion = async (quizId, questionData) => {
    const quiz = await model.findById(quizId);
    quiz.questions.push(questionData);
    await quiz.save();
    return quiz;
};
export const findQuestionById = async (quizId, questionId) => {
    const quiz = await model.findById(quizId);
    return quiz.questions.id(questionId); // Mongoose subdocument querying syntax
};
export const updateQuestion = async (quizId, questionId, questionUpdate) => {
    const quiz = await model.findById(quizId);
    const question = quiz.questions.id(questionId);
    if (question) {
      question.set(questionUpdate);
      await quiz.save();
      return question;
    }
    throw new Error('Question not found');
};
export const deleteQuestion = async (quizId, questionId) => {
    const quiz = await model.findById(quizId);
    const question = quiz.questions.id(questionId);
    if (question) {
      question.remove();
      await quiz.save();
      return quiz; 
    }
    throw new Error('Question not found');
};
  