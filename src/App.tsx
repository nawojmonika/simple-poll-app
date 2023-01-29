import React from 'react';
import styles from './App.module.css';
import { PollResult } from './components/PollResult';
import { OptionsWrapper } from './components/OptionsContext';
import { PollCreator } from './components/PollCreator';
import { RadioButtonGroup } from './components/RadioButtonGroup';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <h1>Sir Vote-a-lot</h1>
      </header>
      <OptionsWrapper>
        <main className={styles.container}>
          <PollCreator />
          <RadioButtonGroup />
          <PollResult />
        </main>
      </OptionsWrapper>
    </div>
  );
}

export default App;
