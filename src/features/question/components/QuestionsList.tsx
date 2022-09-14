import * as React from "react";
import { Alert, Button, Stack } from "react-bootstrap";
import { BsSortAlphaDown } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { removeQuestion, removeAllQuestions, sortQuestions, selectQuestions } from "../questionSlice";
import Question from "./Question";
import Tooltip from "./Tooltip/Tooltip";
import "./QuestionsList.css";

interface IQuestionsListProps {}

const QuestionsList: React.FC<IQuestionsListProps> = () => {
  const questions = useAppSelector(selectQuestions);
  const dispatch = useAppDispatch();

  const deleteQuestion = (question: IQuestion) => {
    dispatch(removeQuestion(question));
  };

  const deleteAllQuestions = () => {
    dispatch(removeAllQuestions());
  };

  const sortQuestionsHandler = () => {
    dispatch(sortQuestions());
  };

  const renderQuestionList = questions.map((question: IQuestion) => (
    <Question key={question.id} question={question} deleteQuestion={deleteQuestion} />
  ));

  return (
    <>
      <Stack direction="horizontal" gap={3} className="mb-3">
        <Tooltip
          disabled={false}
          content={
            <>
              List of questions are displayed here.
              <br />
              you can see the related <b>answer</b> by clicking on each question.
            </>
          }
        >
          <h2>Questions</h2>
        </Tooltip>

        <Button
          type="submit"
          variant="primary"
          className="ms-auto"
          onClick={() => {
            sortQuestionsHandler();
          }}
        >
          <span className="btn-text">Sort Questions</span>
          <BsSortAlphaDown className="btn-icon" />
        </Button>

        <Button type="submit" variant="danger" onClick={() => deleteAllQuestions()}>
          <span className="btn-text">Remove All Questions</span>
          <RiDeleteBinLine className="btn-icon" />
        </Button>
      </Stack>

      <div>{questions.length > 0 ? renderQuestionList : <Alert variant="danger">No questions yet :-(</Alert>}</div>
    </>
  );
};

export default QuestionsList;
