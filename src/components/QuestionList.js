import React from "react";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  if (!Array.isArray(questions)) {
    return <p>No questions available.</p>;
  }
  const handleUpdateClick = (question) => {
    const newCorrectIndex = (question.correctIndex + 1) % question.answers.length;
    const updatedQuestion = { ...question, correctIndex: newCorrectIndex };
    onUpdateQuestion(updatedQuestion);
  };

  return (
    <ul>
      {questions.map((question) => (
        <li key={question.id}>
          <h2>{question.prompt}</h2>
          <ul>
            {question.answers.map((answer, index) => (
              <li key={index}>
                {answer} {index === question.correctIndex && "(Correct)"}
              </li>
            ))}
          </ul>
          <button onClick={() => handleUpdateClick(question)}>Update Answer</button>
          <button onClick={() => onDeleteQuestion(question.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default QuestionList;
