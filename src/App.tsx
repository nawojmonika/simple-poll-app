import React from 'react';
import styles from './App.module.css';
import { OptionsWrapper } from './components/OptionsContext';
import { PollCreator } from './components/PollCreator';
import { RadioButtonGroup } from './components/RadioButtonGroup';

function App() {
  return (
    <div className={styles.App}>
      <header>
        <h1>To do: a pun title</h1>
      </header>
      <OptionsWrapper>
        <main className={styles.container}>
          <PollCreator />
          <RadioButtonGroup />
          <section>
            Here there will be a diagram
          </section>
        </main>
      </OptionsWrapper>
    </div>
  );
}

export default App;
