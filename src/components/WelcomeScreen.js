import React from 'react'

export default function WelcomeScreen({ handleStart }) {
  return (
    <div className='welcome-screen'>
      <h1 className='title'>Quizzical</h1>
      <p className='description'>
        Test your trivia knowledge. Hit play to get started!
      </p>
      <form className='welcome-form' onSubmit={handleStart}>
        <label htmlFor='category'>
          Select a category <span>(optional)</span>:
        </label>
        <select name='category' id='category'>
          <option value=''>--Choose a category--</option>
          <option value='9'>General Knowledge</option>
          <option value='10'>Entertainment: Books</option>
          <option value='11'>Entertainment: Film</option>
          <option value='12'>Entertainment: Music</option>
          <option value='14'>Entertainment: Television</option>
          <option value='15'>Entertainment: Video Games</option>
          <option value='17'>Science & Nature</option>
          <option value='18'>Science: Computers</option>
          <option value='19'>Science: Mathematics</option>
          <option value='20'>Mythology</option>
          <option value='21'>Sports</option>
          <option value='22'>Geography</option>
          <option value='23'>History</option>
          <option value='24'>Politics</option>
          <option value='25'>Art</option>
          <option value='26'>Celebrities</option>
          <option value='27'>Animals</option>
          <option value='28'>Vehicles</option>
        </select>
        <button type='submit' className='start-btn'>
          Play
        </button>
      </form>
    </div>
  )
}
