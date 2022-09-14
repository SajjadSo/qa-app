interface IQuestion {
  id: string;
  question: string;
  answer: string;
  saveDelay: boolean;
}

interface IQuestionState {
  questions: IQuestion[];
}
