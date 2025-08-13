export interface Question {
  text: string;
  options: string[];
  correctIndexing: number;
}

export interface Answer {
  questionIndex: number;
  selectedOption: number | null;
}

export interface QuizState {
  currentQuestion: number;
  answers: Answer[];
  score: number;
  isFinish: boolean;
  skipped: number[];
  timedLed: number;
}