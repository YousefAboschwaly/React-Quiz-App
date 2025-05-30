import { useEffect } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import { useReducer } from 'react'
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Timer from './components/Timer';

const intialState= {
  questions:[],

  //   loading , error , ready , active, finished , 
  status:"loading",
  index:0,
  answer:null,
  points:0,
  highScore:0,
  secondsRemaining:null
}
const SECS_PER_QUESTION = 30;
export default function App() {

  function reducer (state , action){
    console.log(state , action)
    switch(action.type){
      case 'dataReceived':
        return{
          ...state,
          questions:action.data,
          status:"ready"
        }
      case 'dataFailed':
        return{
          ...state,
          status:"error"
        }
      case 'start':
        return{
          ...state,
          status:"active",
          secondsRemaining: state.questions.length * SECS_PER_QUESTION
        }
      case 'newAnswer': {
        const question = state.questions[state.index]
          return{
            ...state,
            answer:action.payload,
            points:action.payload === question.correctOption ? state.points + question.points  : state.points
          }
      }
      case 'nextQuestion':
        return { ...state,  index: state.index + 1 , answer: null };
      case 'finish':
        return{ ...state , status:"finished", highScore: Math.max(state.points , state.highScore) }
      case 'reset':
        return { ...state , index:0 , answer:null , points:0 , status:"ready" , secondsRemaining:10 }
      case 'tick':
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "finished" : state.status,
        };

      default:
        throw new Error("Invalid action");

    }
  }

  const [state , dispatch] = useReducer(reducer , intialState)
  const { questions , status, index , answer , points , highScore , secondsRemaining} = state;
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev,cur)=>prev+cur.points , 0)


  useEffect( function(){
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", data: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  },[])


  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              Question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              />

              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}
