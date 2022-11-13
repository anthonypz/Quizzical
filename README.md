# Quizzical

Quizzical is a trivia app that generates questions based on your selected category. The project is built with React and uses the [Open Trivia Database](https://opentdb.com/) API as the source for trivia data.

**Link to project:** https://quizzical.pereza.dev/

<img src="https://github.com/anthonypz/quizzical/blob/main/docs/images/quizzical.webp" width=300> <img src="https://github.com/anthonypz/quizzical/blob/main/docs/images/quizzical2.webp" width=300>

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, React, Nanoid, opentdb API

This frontend React project was interesting to build because the data retrieved from the [Open Trivia Database](https://opentdb.com/) API was not organized or sorted in a way that would make it simple to build out the UI. The first challenge was finding an optimal way to mutate the API data and save it to state. This was accomplished by applying a unique ID to each group of questions using NanoID, saving the trivia choices into a single array, and shuffling that single array so that the correct answer was always in a random position.

After organizing the data, I created a Welcome Screen component that greets the user with a form and a play button. The form allows the user to choose a category of trivia questions. The selection is saved to state using the onSubmit event handler. From there, the selection is appended to a template literal string when fetching data from the opentdb API like so: `https://opentdb.com/api.php?amount=5&category=${category}`.

The data is displayed using a form holding a list of questions and answers (using radio inputs). In order to retrieve the selected input options, I used an onChange event handler to save them to state. After submitting the form, conditional rendering is used to style the correct and incorrect answers. Finally, the score is calculated by comparing the correct answer to the selected option and is displayed to the user.

## Optimizations

My first implementation for shuffling the trivia answers was not very efficent since it used a nested for-loop. By using the Fisher-Yates shuffle algorithm, I was able to reduce the time complexity from quadratic time [O(n^2)] to linear time [O(n)].

After testing the app, I noticed there were repeat questions appearing when starting a new game. In order to prevent this from happening, I appended a unique token to the the trivia API call to keep track of the questions that the API already retrieved.

## Lessons Learned:

Do not reinvent the wheel. My app's first implementation used state to store the selected trivia answer for each item. This was completely unneccessary since a simple form and a set of radio buttons were able to accomplish the same task with less complexity. I learned that researching solutions and using existing tech can simplify your project and speed up the development process.

## License

[MIT](https://github.com/anthonypz/quizzical/blob/main/LICENSE)
