"use client"
import data from '@/app/data.json'
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
    <Questions genre={genre} setGenre={setGenre} question={question} setQuestion={setQuestion} />
    }
    </>
  );
}


function Questions({genre, setGenre, question, setQuestion}) {
  
  return (
    <>
    <div className="container">
      <header>
        <div className="logo">
          {<img src={genre.icon} />}
        </div>
        {}
      </header>
    </div>
    </>
  )
}