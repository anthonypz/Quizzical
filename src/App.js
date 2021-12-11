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

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(
          data.results
            .map((q) => {
              return {
                id: nanoid(),
                type: q.type,
                question: q.question,
                choices: [
                  ...q.incorrect_answers.map((choice) => ({
                    choice: choice,
                    id: nanoid(),
                    isChosen: false,
                    isCorrect: false,
                  })),
                  {
                    choice: q.correct_answer,
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

  function handleDone() {
    if (isDone) {
      setReplay(true);
    }
    setIsDone(true);
  }

  return (
    <>
      {start && loaded ? (
        <QuizScreen data={questions} isDone={isDone} handleDone={handleDone} />
      ) : (
        <WelcomeScreen handleClick={handleStart} />
      )}
    </>
  );
}
