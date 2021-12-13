import React from "react";

export default function QuizScreen({
  data,
  isDone,
  handleDone,
  handleReplay,
  handleButton,
  score,
}) {
  const questions = data.map((data) => (
    <div key={data.id} className="quiz-question-group">
      <p
        className="quiz-question"
        dangerouslySetInnerHTML={{ __html: data.question }}
      />
      {data.choices.map((i) => {
        return (
          <button
            className="quiz-choices"
            key={i.id}
            style={{
              backgroundColor: i.isChosen ? "#D6DBF5" : "#f5f7fb",
            }}
            onClick={(e) => handleButton(e, i.id)}
            name={data.id}
            dangerouslySetInnerHTML={{ __html: i.choice }}
          />
        );
      })}
    </div>
  ));
  return (
    <div className="quiz-screen">
      {questions}
      {isDone && (
        <p className="final-score">You scored {score}/5 correct answers</p>
      )}
      {!isDone ? (
        <button className="quiz-btn" onClick={handleDone}>
          Check answers
        </button>
      ) : (
        <button className="quiz-btn" onClick={handleReplay}>
          Play again
        </button>
      )}
    </div>
  );
}
