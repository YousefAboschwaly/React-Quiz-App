import React from 'react'
import { useQuiz } from '../context/QuizContext'

export default function FinishScreen() {
  const { dispatch, points, maxPossiblePoints, highScore } = useQuiz()
  const percentage = (points / maxPossiblePoints) * 100
  let emoji
  if(percentage === 100)  emoji = '🥇'
  if(percentage >=80 && percentage <100)  emoji = '🎉'
  if(percentage >=50 && percentage <80)  emoji = '🙃'
  if(percentage >0 && percentage <50)  emoji = '😢'
  if(percentage === 0)  emoji = '🤦‍♂️'
  return (
    <div className='finish-screen'>
      <p className="result">
        <span>
          {emoji} You scored <strong>{points}</strong> out of{" "}
          {maxPossiblePoints} ({Math.ceil(percentage)}%)
        </span>
      </p>
      <p className='highscore'> (Highscore : {highScore} points) </p>

      <button
        className="btn btn-ui -mx-8 "
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart quiz 
      </button>
    </div>
  );
}
