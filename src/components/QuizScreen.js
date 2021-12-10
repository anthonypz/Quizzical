import React from "react";

export default function QuizScreen({ data, isDone, handleDone }) {
  const questions = data.map((data) => (
    <div key={data.id} className="quiz-question-group">
      <p
        className="quiz-question"
        dangerouslySetInnerHTML={{ __html: data.question }}
      />
      {data.choices.map((i) => {
        return <button>{i.choice}</button>;
      })}
    </div>
  ));
  return (
    <div className="quiz-screen">
      {questions}
      <button className="quiz-btn" onClick={handleDone}>
        {!isDone ? "Check answers" : "Play again"}
      </button>
    </div>
  );
}
