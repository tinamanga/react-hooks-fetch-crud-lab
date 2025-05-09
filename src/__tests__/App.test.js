import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../components/App";
import { cleanup } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import '@testing-library/jest-dom';

// Enable jest-fetch-mock
fetchMock.enableMocks();

beforeEach(() => {
  cleanup();
  fetch.resetMocks(); 
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});


test("creates a new question when the form is submitted", async () => {
  // Mock the GET request for fetching initial questions (empty array initially)
  fetch.mockResponseOnce(JSON.stringify([])); // Initial GET

  // Mock the POST request when the new question is added
  fetch.mockResponseOnce(
    JSON.stringify({
      id: 1,
      prompt: "lorem testum 1",
      answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
      correctIndex: 2,
    })
  ); // POST

  render(<App />);

  // Click on the 'New Question' button to open the form
  fireEvent.click(screen.getByText("New Question"));

  // Simulate filling in the form fields
  fireEvent.change(screen.getByLabelText(/Question Prompt/), {
    target: { value: "lorem testum 1" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Answer 1/), {
    target: { value: "Answer 1" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Answer 2/), {
    target: { value: "Answer 2" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Answer 3/), {
    target: { value: "Answer 3" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Answer 4/), {
    target: { value: "Answer 4" },
  });
  fireEvent.change(screen.getByLabelText(/Correct Answer/), {
    target: { value: "2" },
  });

  // Submitting the form to add the question
  fireEvent.click(screen.getByText("Add Question"));

  // Wait for the new question to appear in the list
  await waitFor(() => screen.getByText("lorem testum 1"));
  
  // Ensuring the question is rendered
  expect(screen.getByText("lorem testum 1")).toBeInTheDocument();
});

test("updates the answer when the dropdown is changed", async () => {
  fetch.mockResponseOnce(JSON.stringify([])); 

  // Mock the POST request when adding a question
  fetch.mockResponseOnce(
    JSON.stringify({
      id: 1,
      prompt: "lorem testum 1",
      answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
      correctIndex: 2,
    })
  ); 

  render(<App />);

 
  fireEvent.click(screen.getByText("New Question"));
  fireEvent.change(screen.getByLabelText(/Question Prompt/), {
    target: { value: "lorem testum 1" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Answer 1/), {
    target: { value: "Answer 1" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Answer 2/), {
    target: { value: "Answer 2" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Answer 3/), {
    target: { value: "Answer 3" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Answer 4/), {
    target: { value: "Answer 4" },
  });
  fireEvent.change(screen.getByLabelText(/Correct Answer/), {
    target: { value: "2" },
  });

 
  fireEvent.click(screen.getByText("Add Question"));

  
  fireEvent.change(screen.getByLabelText(/Correct Answer/), {
    target: { value: "3" }, 
  });

  
  expect(screen.getByLabelText(/Correct Answer/).value).toBe("3");
});
