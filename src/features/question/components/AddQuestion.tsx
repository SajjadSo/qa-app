import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { Alert, Button, Form, Stack } from "react-bootstrap";
import { useAppDispatch } from "../../../app/hooks";
import { addQuestionIfDelay } from "../questionSlice";
import Tooltip from "./Tooltip/Tooltip";

interface IAddQuestionProps {}

const AddQuestion: React.FunctionComponent<IAddQuestionProps> = props => {
  const dispatch = useAppDispatch();
  const [error, setError] = React.useState<string>("");
  const questionRef = React.useRef<HTMLInputElement | null>(null);
  const answerRef = React.useRef<HTMLInputElement | null>(null);
  const delayRef = React.useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (questionRef.current?.value === "" || answerRef.current?.value === "") {
      return setError("All fields are mandatory");
    }

    setError("");

    const question: IQuestion = {
      id: uuidv4(),
      question: (questionRef.current as HTMLInputElement).value,
      answer: (answerRef.current as HTMLInputElement).value,
      saveDelay: (delayRef.current as HTMLInputElement).checked
    };

    dispatch(addQuestionIfDelay(question));

    (questionRef.current as HTMLInputElement).value = "";
    (answerRef.current as HTMLInputElement).value = "";
    (delayRef.current as HTMLInputElement).checked = false;
  };

  return (
    <>
      <Stack direction="horizontal">
        <Tooltip disabled={false} content={<>Create a new question using the form below.</>}>
          <div>
            <h2>Create a new Question</h2>
          </div>
        </Tooltip>
      </Stack>

      {error && <Alert variant="danger">{error}</Alert>}
      <Form className="my-3" onSubmit={e => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicQuestion">
          <Form.Label>Question</Form.Label>
          <Form.Control type="text" placeholder="Enter Question" ref={questionRef} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAnswer">
          <Form.Label>Answer</Form.Label>
          <Form.Control type="text" placeholder="Enter Answer" ref={answerRef} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckboxDelay">
          <Form.Check type="checkbox" label="Save me after 5 seconds delay" ref={delayRef} />
        </Form.Group>
        <Button type="submit" variant="success">
          Create
        </Button>
      </Form>
    </>
  );
};

export default AddQuestion;
