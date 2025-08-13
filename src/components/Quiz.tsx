import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { questions } from "../constant/Questions";
import {
  finishQuiz,
  nextQuestion,
  selectedAnswer,
  skipQuestion,
} from "../redux/reducer/quizSlice";

const Quiz: React.FC = () => {
  const dispatch = useDispatch();
  const { currentQuestion, answers } = useSelector(
    (state: RootState) => state.quiz
  );

  const q = questions[currentQuestion];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h3 style={{ marginBottom: "10px", color: "#555" }}>
          Question: {currentQuestion + 1} of {questions?.length}
        </h3>

        <h1 style={{ marginBottom: "20px", fontSize: "20px", color: "#333" }}>
          {q?.text}
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {q?.options?.map((opt, i) => {
            const isSelected = answers[currentQuestion]?.selectedOption === i;
            return (
              <button
                key={i}
                onClick={() => dispatch(selectedAnswer(i))}
                style={{
                  padding: "12px 18px",
                  backgroundColor: isSelected ? "#e6f3ff" : "#fff",
                  border: `2px solid ${isSelected ? "#3399ff" : "#ccc"}`,
                  borderRadius: "8px",
                  fontSize: "16px",
                  color: isSelected ? "#0066cc" : "#333",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textAlign: "center",
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {currentQuestion < questions?.length - 1 && (
            <>
              <button
                onClick={() => dispatch(skipQuestion())}
                style={{
                  padding: "10px 18px",
                  backgroundColor: "#f5f5f5",
                  border: "2px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                Skip
              </button>

              <button
                onClick={() => dispatch(nextQuestion())}
                style={{
                  padding: "10px 18px",
                  backgroundColor: "#007bff",
                  border: "2px solid #007bff",
                  color: "#fff",
                  borderRadius: "8px",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                Next
              </button>
            </>
          )}
          

          {currentQuestion === questions?.length - 1 && (
            <button
              onClick={() => dispatch(finishQuiz())}
              style={{
                padding: "10px 18px",
                backgroundColor: "#28a745",
                border: "2px solid #28a745",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;

