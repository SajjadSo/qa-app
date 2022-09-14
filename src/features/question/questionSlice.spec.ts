import questionReducer, {
  removeQuestion,
  removeAllQuestions,
  initialState,
  addQuestion,
  sortQuestions,
  editQuestion
} from "./questionSlice";

describe("counter reducer", () => {
  const question1: IQuestion = {
    id: "1",
    question: "How to add a question?",
    answer: "Just use the form below",
    saveDelay: false
  };

  const question2: IQuestion = {
    id: "2",
    question: "What about another question?",
    answer: "Just use the form again",
    saveDelay: true
  };

  it("should handle initial state", () => {
    expect(questionReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle addQuestion when a new question received", () => {
    const actual = questionReducer(initialState, addQuestion(question1));
    expect(actual.questions[1].id).toEqual("1");
  });

  it("should handle removeQuestion", () => {
    const actual1 = questionReducer(initialState, addQuestion(question1));
    expect(actual1.questions.length).toEqual(2);

    const actual2 = questionReducer(actual1, removeQuestion(question1));
    expect(actual2.questions.length).toEqual(1);
  });

  it("should handle removeAllQuestions", () => {
    const actual = questionReducer(initialState, removeAllQuestions());
    expect(actual.questions.length).toEqual(0);
  });

  it("should handle sortQuestions", () => {
    const actual1 = questionReducer(initialState, addQuestion(question2));
    const actual2 = questionReducer(actual1, addQuestion(question1));
    const actual3 = questionReducer(actual2, sortQuestions());

    expect(actual3.questions.length).toEqual(3);
    expect(actual3.questions[2].id).toEqual("2");
  });

  it("should handle editQuestion", () => {
    const editedQuestion = { ...question1, question: "edited Question" };

    const actual1 = questionReducer(initialState, addQuestion(question1));
    const actual2 = questionReducer(actual1, editQuestion(editedQuestion));

    expect(actual2.questions[1].question).toEqual("edited Question");
  });
});
