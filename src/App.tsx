import React from 'react';
import './App.css';
import { PollCreator } from './components/PollCreator';

function App(): JSX.Element {
  return (
    <div className="App">
      <header>
        <h1>To do: a pun title</h1>
      </header>
      <main className='container'>
        <section>
          <PollCreator />
        </section>
        <section>
          Here there will be a poll to vote
        </section>
        <section>
          Here there will be a diagram
        </section>
      </main>
    </div>
  );
}

export default App;
