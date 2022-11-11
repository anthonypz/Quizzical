import React from 'react'
import { nanoid } from 'nanoid'
import WelcomeScreen from './components/WelcomeScreen'
import TriviaScreen from './components/TriviaScreen'

export default function App() {
  const [start, setStart] = React.useState(true)
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

  // saves the selection options from the submitted form to state
  const updateAnswers = (event) => {
    setAnswers({
      ...answers,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    // stops the page from refreshing when submitting the form
    event.preventDefault()
    if (gameOver) {
      setGameOver(false)
      setReplay((prevReplay) => !prevReplay)
      setScore(0)
    } else {
      setScore(calculateScore())
      setGameOver(true)
    }
  }

  const calculateScore = () => {
    let num = 0
    for (let i = 0; i < triviaData.length; i++) {
      if (triviaData[i].correct_answer === answers[`question${i}`]) {
        num++
      }
    }
    return num
  }

  const handleStart = () => {}

  return (
    <>
      {start ? (
        <TriviaScreen
          triviaData={triviaData}
          answers={answers}
          gameOver={gameOver}
          updateAnswers={updateAnswers}
          handleSubmit={handleSubmit}
          score={score}
        />
      ) : (
        <WelcomeScreen handleClick={handleStart} />
      )}
    </>
  )
}
