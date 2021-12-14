import React from "react";

export default function QuizScreen({
  data,
  isDone,
  handleDone,
  handleReplay,
  handleButton,
  score,
  loaded,
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

  const feedback = data.map((data) => (
    <div key={data.id} className="quiz-question-group">
      <p
        className="quiz-question"
        dangerouslySetInnerHTML={{ __html: data.question }}
      />
      {data.choices.map((i) => {
        const styles = {
          backgroundColor: i.isCorrect
            ? "#94D7A2"
            : i.isChosen !== i.isCorrect
            ? "#F8BCBC"
            : "#f5f7fb",
          opacity: i.isCorrect ? 1.0 : 0.5,
        };
        return (
          <button
            className="quiz-choices"
            key={i.id}
            style={styles}
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
      {!isDone && loaded ? (
        <>
          {questions}
          <button className="quiz-btn" onClick={handleDone}>
            Check answers
          </button>
        </>
      ) : (
        <>
          {feedback}
          <p className="final-score">You scored {score}/5 answers correctly</p>
          <button className="quiz-btn" onClick={handleReplay}>
            Play again
          </button>
        </>
      )}
    </div>
  );
}
