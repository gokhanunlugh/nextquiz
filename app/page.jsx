import data from '@/app/data.json'

export default function Home() {
  return (
    <>
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
          {data.questionAndAnswers.map((x,i) => <label key={i}> <button><img src={x.icon}/>{x.category}</button></label>)}
        </div>
      </div>
    </div>
    
    </>
  );
}
