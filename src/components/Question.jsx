import { useQuiz } from "../context/QuizContext";

export default function Question() {
  const { questions, index , answer, dispatch } = useQuiz();

  const { question, options, correctOption } = questions[index];
  const hasAnswered = answer !== null;
  const renderOptions = options.map((option, index) => (
    <button
      className={`btn btn-option  ${index === answer ? "answer " : ""}  ${
        hasAnswered
          ? option === options[correctOption]
            ? "correct"
            : "wrong"
          : ""
      }`}
      key={option}
      onClick={() => {
       
  dispatch({ type: "newAnswer", payload: index })
      }}
      disabled={hasAnswered}
    >
      {option}
    </button>
  ));

  return (
    <div className="question">
      <h4>{question}</h4>
      <div className="options ">{renderOptions}</div>
    </div>
  );
}
