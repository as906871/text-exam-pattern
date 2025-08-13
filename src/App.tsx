import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store/store'
import Result from './components/Result';
import Quiz from './components/Quiz';

const App: React.FC = () => {
  const {isFinish} = useSelector((state:RootState)=> state.quiz);
  console.log(isFinish);
  return (
    <div>{isFinish ? <Result /> : <Quiz />}</div>
  )
}

export default App
