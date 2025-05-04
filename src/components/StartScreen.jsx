
export default function StartScreen({numQuestions , dispatch}) {
  return (
    <div className="start">
      <h2 className="">Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your react mastery</h3>

      <button className="btn btn-ui" onClick={()=>dispatch({type:"start"})}>let's start</button>


    </div>
  )
}
