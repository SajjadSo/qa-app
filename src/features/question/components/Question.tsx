import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Collapse } from "react-bootstrap";

interface IQuestionProps {
  question: IQuestion;
  deleteQuestion: (question: IQuestion) => void;
}

const Question: React.FC<IQuestionProps> = ({ question, deleteQuestion }) => {
  const [answerVisible, setAnswerVisible] = React.useState<boolean>(false);
  console.log(question.id);

  return (
    <div className="mb-3">
      <Card>
        <Card.Body>
          <Card.Title>
            <span style={{ cursor: "pointer" }} onClick={() => setAnswerVisible(!answerVisible)}>
              {question.question}
            </span>
          </Card.Title>
          <Collapse in={answerVisible}>
            <Card.Subtitle className="text-muted">{question.answer}</Card.Subtitle>
          </Collapse>
          <Link to="/edit" state={question}>
            <Button className="mt-3" variant="secondary" size="sm">
              Edit
            </Button>
          </Link>
          <Button className="mt-3 mx-2" variant="danger" size="sm" onClick={() => deleteQuestion(question)}>
            Remove
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default React.memo(Question);
