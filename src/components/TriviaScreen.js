import React from 'react'

export default function QuizScreen({
  triviaData,
  answers,
  gameOver,
  updateAnswers,
  handleSubmit,
  score,
  handleStartOver,
}) {
  // display the score visually using green and red colors
  let questions = () =>
    triviaData.map((item, idx) => {
      return (
        <div className='trivia-question-group' key={item.id}>
          <p
            className='trivia-question'
            dangerouslySetInnerHTML={{ __html: item.question }}
          />
          {item.every_choice.map((currChoice, i) => {
            const isCorrect = currChoice === item.correct_answer
            const styles = {
              backgroundColor: isCorrect
                ? '#94D7A2'
                : answers[`question${idx}`] !== item.correct_answer &&
                  answers[`question${idx}`] === currChoice
                ? '#F8BCBC'
                : '#F5F7FB',
              opacity: isCorrect ? 1.0 : 0.5,
            }
            return (
              <div key={item.id + i} className='trivia-choices'>
                <input
                  type='radio'
                  id={item.id + i}
                  name={`question${idx}`}
                  value={currChoice}
                  onChange={updateAnswers}
                />
                <label
                  className='trivia-choice'
                  htmlFor={item.id + i}
                  dangerouslySetInnerHTML={{ __html: currChoice }}
                  style={gameOver ? styles : {}}
                />
              </div>
            )
          })}
        </div>
      )
    })

  return (
    <form className='trivia-screen' onSubmit={handleSubmit}>
      {questions()}
      {gameOver && (
        <p className='final-score'>
          You answered {score} of 5 questions correctly.
        </p>
      )}
      <div className='btn-group'>
        <button type='submit' className='trivia-btn'>
          {gameOver ? 'Play again' : 'Check Answers'}
        </button>
        {gameOver && (
          <button className='trivia-btn' onClick={handleStartOver}>
            Goto start menu
          </button>
        )}
      </div>
    </form>
  )
}
