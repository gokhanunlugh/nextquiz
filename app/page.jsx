"use client"
import data from '@/app/data.json'
import { useState, useEffect } from 'react';

export default function Home() {
  const [genre, setGenre] = useState([]);
  const [ currentQuestion, setCurrentQuestion ] = useState(0);

  function handleClick(x) {
    setGenre(x);
  }
  return (
    <>
      {
        genre.length === 0 ?
          <div className="container">
            <header>
              <div className="logo"></div>
              <DarkMode />
            </header>
            <div className="content">
              <div className="context">
                <h2>Welcome to the</h2>
                <h2><strong>Frontend Quiz!</strong></h2>
                <p>Pick a subject to get started.</p>
              </div>
              <div className="categories">
                {data.questionAndAnswers.map((x, i) => <label key={i}> <button onClick={() => handleClick(x)}><img src={x.icon} />{x.category}</button></label>)}
              </div>
            </div>
          </div>
          :
          <Questions genre={genre} setGenre={setGenre} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
      }
    </>
  );
}


function DarkMode() {
  const [theme, setTheme] =useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme])

  return (
    <div className="themeSwitch">
      <img src="/img/lightM.svg" alt="" />

      <label className="switch">
        <input type="checkbox" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}/>
        <span className="slider round"></span>
      </label>

      <img src="/img/darkM.svg" alt="" />
    </div>
  )
}


function Questions({ genre, setGenre, currentQuestion, setCurrentQuestion }) {
  const [userAnswer, setUserAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSelectedAnswer, setIsSelectedAnswer] = useState(true);
  const [score, setScore] = useState(0);

  function handleAnswerSelect(e) {
    if (!submitted) {
      const allAnswers = document.querySelectorAll('.answer');
      allAnswers.forEach((answer) => answer.classList.remove('selected'));

      const selectedAnswer = e.currentTarget;
      selectedAnswer.classList.add('selected');
    }
  }

  const handleAnswer = (x) => {
    if (!submitted) {
      setUserAnswer(x);
    }

  }

  const handleSubmit = () => {
    if (userAnswer === null) return setIsSelectedAnswer(false);
    setSubmitted(true);

    const correctAnswer = genre.questions[currentQuestion].answer;
    const allAnswers = document.querySelectorAll('.answer');


    allAnswers.forEach((answer) => {
      const selected = answer.querySelector('.answerOption').innerText;

      if (selected === correctAnswer) {
        answer.classList.add('correctAnswer')
        answer.classList.remove('selected')
      } else if (selected === userAnswer) {
        answer.classList.add('wrongAnswer')
        answer.classList.remove('selected')
      }
    })

    if (userAnswer === genre.questions[currentQuestion].answer) {
      setScore(score + 1)
    }

    setIsSelectedAnswer(true);
    setSubmitted(true);

  }

  const handleNextQuestion = () => {
    document.querySelectorAll('.answer').forEach((answer) => {
      answer.classList.remove('correctAnswer');
      answer.classList.remove('wrongAnswer');
      answer.classList.remove('selected');
    });

    if (currentQuestion < genre.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }

    setUserAnswer(null);
    setSubmitted(false);
  };

  useEffect(() => {
    document.querySelectorAll('.answer').forEach((answer) => {
      answer.classList.remove('correctAnswer');
      answer.classList.remove('wrongAnswer');
      answer.classList.remove('selected');
    });
  }, [currentQuestion]);

  return (
    <>
      {
        currentQuestion < 10
          ?

          <div className="container">
            <header>
              <div className="logo">
                {<img src={genre.icon} />}
              </div>
              { }
            </header>

            <div className="content">
              <div className="questions">
                <p>Question {currentQuestion + 1} of 10</p>
                <h3>{genre.questions[currentQuestion].question}</h3>
              </div>
              <div className="answers">
                {genre.questions[currentQuestion].options.map((x, i) => (
                  <div onClick={handleAnswerSelect} className="answer">
                    <button onClick={() => handleAnswer(x)}>
                      <p>{i === 0 && <span>A</span> || i === 1 && <span>B</span> || i === 2 && <span>C</span> || i === 3 && <span>D</span>}</p>
                      <p className={'answerOption'}>{x}</p>
                    </button>
                  </div>
                ))}

                {!submitted ?
                  <button className='submit' onClick={handleSubmit}>Submit Answer</button> :
                  <button className='submit' onClick={handleNextQuestion}>Next Question</button>
                }

                {!isSelectedAnswer && <p className="error"><img src="/img/selectError.png" alt="" /> Please select an answer</p>}

              </div>
            </div>
          </div>
          :
          <EndPage genre={genre} setGenre={setGenre} setCurrentQuestion={setCurrentQuestion} score={score} />
      }
    </>
  )
}


function EndPage({ score, genre, setGenre, setCurrentQuestion }) {

  function handlePlayAgain() {
    setGenre([]);
    setCurrentQuestion(0);
  }

  return (
    <div className="container">
      <header>
        <div className="logo">
          {<img src={genre.icon} />}
        </div>
        { }
      </header>

      <div className="content">
        <div className="completeText">
          <h2>Quiz completed</h2>
          <h2>You scored...</h2>
        </div>

        <div className="userScore">
          <div className="scoreBox">
            <p><img src={genre.icon} />{genre.category}</p>
            <h1>{score}</h1>
            <p>out of 10</p>
          </div>

          <button onClick={handlePlayAgain}>Play Again</button>
        </div>
      </div>
    </div>
  )
}