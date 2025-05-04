export default function Question({ Question, dispatch, answer }) {
  const { question, options, correctOption } = Question;
  const hasAnswered = answer !== null;
  const renderOptions = options.map((option, index) => (
    <button
      className={`btn btn-option ${index === answer ? "answer " : ""}  ${
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
    <div>
      <h4>{question}</h4>
      <div className="options">{renderOptions}</div>
    </div>
  );
}
