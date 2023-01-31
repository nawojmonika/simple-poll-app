import React from 'react';
import { PollResult } from './components/PollResult';
import { OptionsWrapper, Option } from './components/OptionsContext';
import { PollCreator } from './components/PollCreator';
import { PollVoter } from './components/PollVoter';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css';


const defaultOptions: Option[] = [
  {
    id: uuidv4(),
    placeholder: 'To be',
    votes: 0,
  },
  {
    id: uuidv4(),
    placeholder: 'Not to be',
    votes: 0,
  },
];

const App = (): JSX.Element => {
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <h1>Sir Vote-a-lot</h1>
      </header>
      <OptionsWrapper defaultOptions={defaultOptions}>
        <main className={styles.container}>
          <PollCreator />
          <PollVoter />
          <PollResult />
        </main>
      </OptionsWrapper>
    </div>
  );
}

export default App;
