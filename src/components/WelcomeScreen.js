import React from "react";

export default function WelcomeScreen(props) {
  return (
    <div className="welcome-screen">
      <h1 className="title">Quizzical</h1>
      <p className="description">
        A short game with randomly generated questions.
      </p>
      <button className="start-btn" onClick={props.handleClick}>
        Start quiz
      </button>
    </div>
  );
}
