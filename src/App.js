import React from 'react'
import { nanoid } from 'nanoid'
import WelcomeScreen from './components/WelcomeScreen'
import TriviaScreen from './components/TriviaScreen'

export default function App() {
  const [start, setStart] = React.useState(false)
  const [category, setCategory] = React.useState('')

  const [token, setToken] = React.useState('')
  const [triviaData, setTriviaData] = React.useState([]) // [{}, {}]
  const [answers, setAnswers] = React.useState({}) // {question0: "True", question1: "False"}
  const [gameOver, setGameOver] = React.useState(false)
  const [score, setScore] = React.useState(0)
  const [replay, setReplay] = React.useState(false)

  // retrieve a token so the user never gets the same question twice
  React.useEffect(() => {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => setToken(data))
  }, [])

  React.useEffect(() => {
    let ignore = false
    // only fetch data once the token has been retrieved and the game has started
    token &&
      start &&
      fetch(
        `https://opentdb.com/api.php?amount=5&category=${category}&token=${token.token}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.response_code === 4) {
            // reset token
            setToken(
              `https://opentdb.com/api_token.php?command=reset&token=${token.token}`
            )
          } else {
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
                    : fisherYates([
                        item.correct_answer,
                        ...item.incorrect_answers,
                      ]),
              }
            })
            if (!ignore) {
              setTriviaData(data)
            }
          }
        })

    return () => {
      ignore = true
    }
  }, [replay, category, token, start])

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

  // restarts the game or calculates the scroe after submitting the TriviaScreen form
  const handleSubmit = (event) => {
    // stops the page from refreshing when submitting the form
    event.preventDefault()
    if (gameOver) {
      setTriviaData([])
      setReplay((prevReplay) => !prevReplay)
      setGameOver(false)
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

  //
  const handleStart = (event) => {
    event.preventDefault()
    setStart(true)
    setCategory(Number(event.target.category.value))
  }

  // resets the game and sends user back to the main menu
  const handleStartOver = () => {
    setStart(false)
    setGameOver(false)
    setScore(0)
    setCategory('')
  }

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
          handleStartOver={handleStartOver}
        />
      ) : (
        <WelcomeScreen handleStart={handleStart} />
      )}
    </>
  )
}
