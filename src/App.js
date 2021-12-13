import React from "react";
import { nanoid } from "nanoid";
import WelcomeScreen from "./components/WelcomeScreen";
import QuizScreen from "./components/QuizScreen";

export default function App() {
  const [questions, setQuestions] = React.useState();
  const [start, setStart] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);
  const [replay, setReplay] = React.useState(false);

  //Grab data from the API and organize it into state
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(
          data.results
            .map((question) => {
              return {
                id: nanoid(),
                question: question.question,
                choices: [
                  ...question.incorrect_answers.map((choice) => ({
                    choice: choice,
                    id: nanoid(),
                    isChosen: false,
                    isCorrect: false,
                  })),
                  {
                    choice: question.correct_answer,
                    id: nanoid(),
                    isChosen: false,
                    isCorrect: true,
                  },
                ],
              };
            })
            .sort((a, b) => 0.5 - Math.random())
        );
        setLoaded(true);
      });
  }, [replay]);

  function handleStart() {
    setStart(true);
  }

  //Change state so that the clicked button becomes selected by flipping the isChosen boolean value
  function handleButton(event, id) {
    const { name } = event.target;
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        if (question.id === name) {
          return {
            ...question,
            choices: question.choices.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  isChosen: !item.isChosen,
                };
              } else {
                return {
                  ...item,
                  isChosen: false,
                };
              }
            }),
          };
        } else {
          return question;
        }
      });
    });
  }

  function handleDone() {
    if (isDone) {
      setReplay(true);
    }
    setIsDone(true);
  }

  return (
    <>
      {start && loaded ? (
        <QuizScreen
          data={questions}
          isDone={isDone}
          handleDone={handleDone}
          handleButton={handleButton}
        />
      ) : (
        <WelcomeScreen handleClick={handleStart} />
      )}
    </>
  );
}
