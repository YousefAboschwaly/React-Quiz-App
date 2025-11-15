import { createContext, useContext, useEffect, useReducer } from "react";
import { supabase } from "../lib/supabase";

const QuizContext = createContext();

const intialState = {
  questions: [],

  //   loading , error , ready , active, finished ,
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};
const SECS_PER_QUESTION = 30;

function QuizProvider({ children }) {
  function reducer(state, action) {
    console.log(state, action);
    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.data,
          status: "ready",
        };
      case "dataFailed":
        return {
          ...state,
          status: "error",
        };
      case "start":
        return {
          ...state,
          status: "active",
          secondsRemaining: state.questions.length * SECS_PER_QUESTION,
        };
      case "newAnswer": {
        const question = state.questions[state.index];
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      }
      case "nextQuestion":
        return { ...state, index: state.index + 1, answer: null };
      case "finish":
        return {
          ...state,
          status: "finished",
          highScore: Math.max(state.points, state.highScore),
        };
      case "reset":
        return {
          ...state,
          index: 0,
          answer: null,
          points: 0,
          status: "ready",
          secondsRemaining: 10,
        };
      case "tick":
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "finished" : state.status,
        };

      default:
        throw new Error("Invalid action");
    }
  }

  const [state, dispatch] = useReducer(reducer, intialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    secondsRemaining,
  } = state;
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
useEffect(function () {
  async function loadQuestions() {
    const { data, error } = await supabase
      .from("questions")
      .select("*");
      console.log(data, error);
    if (error) {
      dispatch({ type: "dataFailed" });
      return;
    }

    dispatch({ type: "dataReceived", data });
  }

  loadQuestions();
}, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { QuizProvider, useQuiz };
