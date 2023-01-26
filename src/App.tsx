import React from 'react';
import './App.css';
import { OptionsWrapper } from './components/OptionsContext';
import { PollCreator } from './components/PollCreator';

function App() {
  return (
    <div className="App">
      <header>
        <h1>To do: a pun title</h1>
      </header>
      <OptionsWrapper>
        <main className='container'>
          <PollCreator />
          <section>
            Here there will be a poll to vote
          </section>
          <section>
            Here there will be a diagram
          </section>
        </main>
      </OptionsWrapper>
    </div>
  );
}

export default App;
