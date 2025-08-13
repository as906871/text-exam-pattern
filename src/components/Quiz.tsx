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
    <div>
      <h3>
        Question: {currentQuestion + 1} of {questions?.length}{" "}
      </h3>

      <h1>{q?.text}</h1>

      {q?.options?.map((opt, i) => {
        const isSelected = answers[currentQuestion]?.selectedOption === i;
        return (
          <button
            key={i}
            onClick={() => dispatch(selectedAnswer(i))}
            style={{
              display: "flex",
              justifyContent: "center",
              width: "15%",
              padding: "12px 18px",
              marginBottom: "10px",
              marginRight: "40px",
              backgroundColor: isSelected ? "#e6f3ff" : "#fff",
              border: `2px solid ${isSelected ? "#3399ff" : "#ccc"}`,
              borderRadius: "12px",
              fontSize: "16px",
              color: isSelected ? "#0066cc" : "#333",
              textAlign: "left",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {opt}
          </button>
        );
      })}

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
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
                fontWeight: "500",
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
                fontWeight: "500",
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
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
