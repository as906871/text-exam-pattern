import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { questions } from "../../constant/Questions";
import { Answer, QuizState } from "../../utils/types";

const createInitialAnswers = (): Answer[] => {
  return questions.map((_, index: any) => ({
    questionIndex: index,
    selectedOption: null,
  }));
};

const initialState: QuizState = {
  currentQuestion: 0,
  answers: createInitialAnswers(),
  score: 0,
  isFinish: false,
  skipped: [],
  timedLed: 20 * 60,
};

const calculateScore = (answers: Answer[]): number => {
  return answers.reduce((acc, answer) => {
    if (answer.selectedOption === null) return acc;

    const question = questions[answer.questionIndex];
    return answer.selectedOption === question.correctIndexing ? acc + 1 : acc;
  }, 0);
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    selectedAnswer: (state, action: PayloadAction<number>) => {
      const currentIndex = state.currentQuestion;
      state.answers[currentIndex] = {
        questionIndex: currentIndex,
        selectedOption: action.payload,
      };
    },

    nextQuestion: (state) => {
      if (state.currentQuestion < questions.length - 1) {
        state.currentQuestion += 1;
      }
    },

    skipQuestion: (state) => {
      if (!state?.skipped.includes(state.currentQuestion)) {
        state.skipped.push(state.currentQuestion);
      }
      state.currentQuestion = Math.min(
        state.currentQuestion + 1,
        questions?.length - 1
      );
    },

    prevQuestion: (state) => {
      if (state.currentQuestion > 0) {
        state.currentQuestion -= 1;
      }
    },

    finishQuiz: (state) => {
      state.score = calculateScore(state.answers);
      state.isFinish = true;
    },

    tick: (state) => {
      if (state.timedLed > 0) {
        state.timedLed -= 1;
      } else {
        quizSlice.caseReducers.finishQuiz(state);
      }
    },

    restartQuiz: () => initialState,
  },
});

export const {selectedAnswer,nextQuestion,restartQuiz, finishQuiz, tick, skipQuestion, prevQuestion } = quizSlice.actions;
export default quizSlice.reducer;
