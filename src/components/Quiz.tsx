import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store/store';
import { questions } from '../constant/Questions';
import { finishQuiz, nextQuestion, selectedAnswer, skipQuestion } from '../redux/reducer/quizSlice';

const Quiz: React.FC = () => {
  const dispatch = useDispatch();
  const {currentQuestion, answers} = useSelector((state:RootState)=> state.quiz);

  const q = questions[currentQuestion];
 
  return (
    <div>
      <h2> Question: { currentQuestion + 1 }  of  {questions?.length} </h2>

      <h4>{q?.text}</h4>
      {q?.options?.map((opt, i)=>(
        <button key={i} onClick={() =>dispatch(selectedAnswer(i))} style={{background: answers[currentQuestion]?.selectedOption == i ? "lightblue" : ""}}>{opt}</button>
      ))}
      <div>
        {currentQuestion < questions?.length -1 && (
          <>          <button onClick={()=> dispatch(skipQuestion())}>Skip</button>

          <button onClick={()=> dispatch(nextQuestion())}>Next</button>
          </>
        )}

        {currentQuestion === questions?.length -1 && (
          <button onClick={()=> dispatch(finishQuiz())}>Finish</button>
        )}
      </div>
    </div>
  )
}

export default Quiz