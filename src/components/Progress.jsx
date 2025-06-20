import { useQuiz } from "../context/QuizContext";

export default function Progress() {
  const {index,numQuestions,points,maxPossiblePoints} = useQuiz()

  return (
    <div className="text-center mt-8 flex justify-center items-center ">


    <header className="progress lg:w-[60rem] w-[40rem]   ">
      <progress max={numQuestions} value={index} />
      <p>
        Question <strong>{index + 1}</strong> /{numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints} 
      </p>
    </header>
    </div>
  );
}
