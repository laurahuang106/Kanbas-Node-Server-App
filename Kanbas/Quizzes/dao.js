import model from "./model.js";

// actions for quizzes
export const createQuiz = async (courseId, quiz) => {
  const quizData = { ...quiz, course: courseId };
  return model.create(quizData); 
};
export const findQuizzesOfCourse = async(courseId) => model.find({ course: courseId });
export const findQuizById = async(quizId) => model.findOne({ id: quizId });
export const updateQuiz = async(quizId, quiz) =>  model.updateOne({ id: quizId }, { $set: quiz });
export const deleteQuiz = async(quizId) => model.deleteOne({ id: quizId });

// actions for questions
export const createQuestion = async (quizId, questionData) => {
    const quiz = await model.findOne({ id: quizId });
    quiz.questions.push(questionData);
    await quiz.save();
    return quiz;
};
export const findQuestionsOfQuiz = async (quizId) => {
  const quiz = await model.findOne({ id: quizId });
  return quiz.questions; 
};

export const findQuestionById = async (quizId, questionId) => {
    const quiz = await model.findOne({ id: quizId });
    return quiz.questions.id(questionId); // Mongoose subdocument querying syntax
};
export const updateQuestion = async (quizId, questionId, questionUpdate) => {
    const quiz = await model.findOne({ id: quizId });
    const question = quiz.questions.id(questionId);
    if (question) {
      question.set(questionUpdate);
      await quiz.save();
      return question;
    }
    throw new Error('Question not found');
};
export const deleteQuestion = async (quizId, questionId) => {
    const quiz = await model.findOne({ id: quizId });
    const question = quiz.questions.id(questionId);
    if (question) {
      question.remove();
      await quiz.save();
      return quiz; 
    }
    throw new Error('Question not found');
};
  