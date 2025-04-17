import React, { useState, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]); // Start with an empty array
  const [view, setView] = useState("list");

  // Fetch all questions from the server
  function fetchQuestions() {
    fetch("http://localhost:4000/questions")
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to fetch questions");
        }
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          console.error("Received non-array data:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }
  
    

  // Fetch questions when the component mounts (for example, when the app starts)
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Change view to "form" for adding a new question
  function handleNewQuestionClick() {
    setView("form");
  }

  // Change view to "list" and fetch all questions
  function handleViewQuestionsClick() {
    fetchQuestions();
    setView("list");
  }

  // Add a new question to the server and update state
  function handleAddQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add question");
        }
        return res.json();
      })
      .then((createdQuestion) => {
        setQuestions((prevQuestions) => [...prevQuestions, createdQuestion]);
        setView("list");
      })
      .catch((error) => {
        console.error("Error adding question:", error);
      });
  }

  // Delete a question by id
  function handleDeleteQuestion(id) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  // Update a question's correct answer
  function handleUpdateQuestion(updated) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updated.id ? updated : q))
    );
  }

  return (
    <main>
      <nav>
        <button onClick={handleNewQuestionClick}>New Question</button>
        <button onClick={handleViewQuestionsClick}>View Questions</button>
      </nav>

      {view === "form" && <QuestionForm onAddQuestion={handleAddQuestion} />}
      {view === "list" && questions.length > 0 && (
        <section>
          <h1>Quiz Questions</h1>
          <QuestionList
            questions={questions}
            onDeleteQuestion={handleDeleteQuestion}
            onUpdateQuestion={handleUpdateQuestion}
          />
        </section>
      )}
      {/* Fallback when there are no questions */}
      {view === "list" && questions.length === 0 && (
        <section>
          <h1>No questions available.</h1>
        </section>
      )}
    </main>
  );
}

export default App;
