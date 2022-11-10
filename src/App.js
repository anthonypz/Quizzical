import React from 'react'
import { nanoid } from 'nanoid'
import WelcomeScreen from './components/WelcomeScreen'
import QuizScreen from './components/QuizScreen'

export default function App() {
  const [start, setStart] = React.useState(false)
  const [triviaData, setTriviaData] = React.useState([]) // [{}, {}]
  const [answers, setAnswers] = React.useState({}) // {question0: "True", question1: "False"}
  const [gameOver, setGameOver] = React.useState(false)
  const [score, setScore] = React.useState(0)
  const [replay, setReplay] = React.useState(false)

  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then((response) => response.json())
      .then((data) => {
        data = data.results.map((item, i) => {
          return {
            id: nanoid(),
            type: item.type,
            question: item.question,
            correct_answer: item.correct_answer,
            every_choice:
              item.type === 'boolean'
                ? [item.correct_answer, item.incorrect_answers[0]]
                    .sort()
                    .reverse() // shuffle array so that true is always first
                : fisherYates([item.correct_answer, ...item.incorrect_answers]),
          }
        })
        setTriviaData(data)
      })
  }, [replay])

  // randomly shuffles an array
  const fisherYates = (toShuffle = []) => {
    for (let i = toShuffle.length - 1; i > 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
      ;[toShuffle[i], toShuffle[randomIndex]] = [
        toShuffle[randomIndex],
        toShuffle[i],
      ]
    }
    return toShuffle
  }

  //Change state so that the clicked button becomes selected by flipping the isChosen boolean value
  function handleSubmit(event) {}

  function calculateScore() {
    // for (let i = 0; i < questions.length; i++) {
    //   for (let j = 0; j < questions[i].choices.length; j++) {
    //     if (
    //       questions[i].choices[j].isChosen &&
    //       questions[i].choices[j].isCorrect
    //     ) {
    //       setScore((prevScore) => prevScore + 1)
    //     }
    //   }
    // }
  }

  function handleStart() {}

  return (
    <>
      {start ? (
        <QuizScreen
          data={triviaData}
          gameOver={gameOver}
          handleSubmit={handleSubmit}
          score={score}
          replay={replay}
        />
      ) : (
        <WelcomeScreen handleClick={handleStart} />
      )}
    </>
  )
}
