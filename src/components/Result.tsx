import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store/store';
import { restartQuiz } from '../redux/reducer/quizSlice';

const Result = () => {
  const dispatch = useDispatch();
  const {score} = useSelector((state:RootState)=> state.quiz);
  const pass = score >= 3
  return (
    <div>
      <h2>Final Score : {score} /5</h2>
      <h3>{pass ? "pass" : "fail"}</h3>
      <button onClick={()=> dispatch(restartQuiz())}>  Restart</button>
    </div>
  )
}

export default Result