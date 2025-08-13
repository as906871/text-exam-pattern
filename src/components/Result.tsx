import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { restartQuiz } from '../redux/reducer/quizSlice';

const Result = () => {
  const dispatch = useDispatch();
  const { score } = useSelector((state: RootState) => state.quiz);
  const pass = score >= 3;

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '30px',
        border: '2px solid #ddd',
        borderRadius: '12px',
        maxWidth: '400px',
        margin: '40px auto',
        backgroundColor: '#fdfdfd',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2
        style={{
          fontSize: '24px',
          marginBottom: '15px',
          color: '#333',
        }}
      >
        Final Score: <span style={{ color: '#007bff' }}>{score} / 5</span>
      </h2>

      <h3
        style={{
          fontSize: '20px',
          marginBottom: '25px',
          color: pass ? '#28a745' : '#dc3545',
          fontWeight: '600',
          textTransform: 'capitalize',
        }}
      >
        {pass ? 'Pass' : 'Fail'}
      </h3>

      <button
        onClick={() => dispatch(restartQuiz())}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '8px',
          color: '#fff',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
        }}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Result;
