import { useQuiz } from "../context/QuizContext";

export default function NextButton() {
  const { dispatch, answer, numQuestions, index } = useQuiz();
  if (answer === null) return null;
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );

  return (
    <div >
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    </div>
  );
}
