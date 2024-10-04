"use client"
import data from '@/app/data.json'
import { Span } from 'next/dist/trace';
import { useState } from 'react';

export default function Home() {
  const [genre, setGenre] = useState([]);
  const {question, setQuestion} = useState(0);

  function handleClick(x){
    setGenre(x);
  }
  return (
    <>
    {
      genre.length ===0 ?
      <div className="container">
      <header>
        <div className="logo"></div>
        {}
      </header>
      <div className="content">
        <div className="context">
          <h2>Welcome to the</h2>
          <h2><strong>Frontend Quiz!</strong></h2>
          <p>Pick a subject to get started.</p>
        </div>
        <div className="categories">
          {data.questionAndAnswers.map((x,i) => <label key={i}> <button onClick={ () => handleClick(x)}><img src={x.icon}/>{x.category}</button></label>)}
        </div>
      </div>
    </div>
    :
    <Questions genre={genre} setGenre={setGenre} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
    }
    </>
  );
}


function Questions({genre, setGenre, currentQuestion, setCurrentQuestion}) {
  
  return (
    <>
    <div className="container">
      <header>
        <div className="logo">
          {<img src={genre.icon} />}
        </div>
        {}
      </header>

      <div className="content">
        <div className="questions">
          <p>Question {currentQuestion +1} of 10</p>
          <h3>{genre.questions[currentQuestion].question}</h3>
        </div>
        <div className="answers">
          {genre.questions[currentQuestion].options.map((x,i) => (
            <div onClick={handleAnswerSelect}  className="answer">
              <button onClick={() => handleAnswer(x)}>
                <p>{i === 0 && <span>A</span> || i === 1 && <span>B</span> || i === 2 && <span>C</span> || i === 3 && <span>D</span>}</p>
                <p>{x}</p>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}