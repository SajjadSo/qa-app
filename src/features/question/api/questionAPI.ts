// A mock function to mimic saving data with an async request
export function saveQuestion(question: IQuestion) {
  return new Promise<{ data: IQuestion }>(resolve => setTimeout(() => resolve({ data: question }), 5000));
}
