import { Container, Stack } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./features/question/components/Header";
import QuestionsList from "./features/question/components/QuestionsList";
import AddQuestion from "./features/question/components/AddQuestion";
import EditQuestion from "./features/question/components/EditQuestion";

function App() {
  const renderMainPage = () => {
    return (
      <Container className="mt-5">
        <Stack gap={3}>
          <div className="bg-light border p-3">
            <QuestionsList />
          </div>
          <div className="bg-light border p-3">
            <AddQuestion />
          </div>
        </Stack>
      </Container>
    );
  };

  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={renderMainPage()} />
          <Route path="/edit" element={<EditQuestion />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
