import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Alert, Button, Container, Form, Stack } from "react-bootstrap";
import { useAppDispatch } from "../../../app/hooks";
import { editQuestion } from "../questionSlice";
import Tooltip from "./Tooltip/Tooltip";

interface IEditQuestionProps {}

const EditQuestion: React.FunctionComponent<IEditQuestionProps> = props => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as IQuestion;
  const [editableQuestion, setEditableQuestion] = React.useState<IQuestion>(data);

  const [error, setError] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editableQuestion.question === "" || editableQuestion.answer === "") {
      return setError("All fields are mandatory");
    }

    setError("");
    dispatch(editQuestion(editableQuestion));
    navigate("/");
  };

  return (
    <>
      <Container className="mt-5">
        <Stack gap={3}>
          <div className="bg-light border p-3">
            <Stack direction="horizontal">
              <Tooltip disabled={false} content={<>Edit a created question and click update.</>}>
                <h2>Edit Question</h2>
              </Tooltip>
            </Stack>

            {error && <Alert variant="danger">{error}</Alert>}
            <Form className="my-3" onSubmit={e => handleSubmit(e)}>
              <Form.Group className="mb-3" controlId="formBasicQuestion">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Question"
                  value={editableQuestion?.question}
                  onChange={e => setEditableQuestion({ ...editableQuestion, question: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicAnswer">
                <Form.Label>Answer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Answer"
                  value={editableQuestion?.answer}
                  onChange={e => setEditableQuestion({ ...editableQuestion, answer: e.target.value })}
                />
              </Form.Group>

              <Link to="/">
                <Button type="button" variant="secondary">
                  Back To Home
                </Button>
              </Link>
              <Button type="submit" variant="success" className="mx-2">
                Update
              </Button>
            </Form>
          </div>
        </Stack>
      </Container>
    </>
  );
};

export default EditQuestion;
