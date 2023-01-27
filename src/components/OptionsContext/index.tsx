import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const minOptions = 2;
const maxOptions = 10;

export type Option = {
    id: string;
    placeholder?: string;
    value?: string;
    votes: number;
}

const defaultOptions: Option[] = [
    {
        id: uuidv4(),
        placeholder: 'First option',
        votes: 0,
    },
    {
        id: uuidv4(),
        placeholder: 'Second option',
        votes: 0,
    },
];

type OptionsContextData = {
    question: string;
    minOptions: number;
    maxOptions: number;
    options: Option[];
    votes: number;
    setQuestion: (value: string) => void;
    addOption: (id: string, value: string) => void;
    changeOption: (id: string, value: string) => void;
    removeOption: (id: string) => void;
    resetOptions: () => void;
    voteForOption: (id: string) => void;
};

type OptionsContextProps = {
    children: React.ReactNode;
};

export const OptionsContext = createContext<OptionsContextData>({
    options: [],
    minOptions: 0,
    maxOptions: 0,
    question: '',
    votes: 0,
    setQuestion: () => undefined,
    addOption: () => undefined,
    changeOption: () => undefined,
    removeOption: () => undefined,
    resetOptions: () => undefined,
    voteForOption: () => undefined,
});

export const OptionsWrapper = ({ children }: OptionsContextProps): JSX.Element => {
    const [question, setQuestion] = useState<string>('');
    const [options, setOptions] = useState<Option[]>(defaultOptions);
    const [votes, setVotes] = useState<number>(0);

    const addOption = (id: string, value: string): void => {
        setOptions([...options, { id, value, votes: 0 }]);
    };

    const changeOption = (id: string, value: string): void => {
        const mappedOptions = options.map((option) => ({ ...option, value: option.id === id ? value : option.value }))
        setOptions(mappedOptions);
    };

    const removeOption = (id: string): void => {
        const filteredOptions = options.filter((option) => option.id !== id);
        setOptions(filteredOptions);
    };

    const resetOptions = (): void => {
        setQuestion('');
        setVotes(0);
        setOptions(defaultOptions);
    };

    const voteForOption = (id: string): void => {
        const mappedOptions = options.map((option) => ({ ...option, votes: option.id === id ? option.votes + 1 : option.votes }))
        setOptions(mappedOptions);
        setVotes(votes + 1);
    };

    return (
        <OptionsContext.Provider value={{ question, options, minOptions, maxOptions, votes, setQuestion, addOption, changeOption, removeOption, resetOptions, voteForOption }}>
            {children}
        </OptionsContext.Provider>
    );
};

export const useOptionsContext = (): OptionsContextData => {
    return useContext(OptionsContext);
};