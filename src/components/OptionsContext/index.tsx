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
    setQuestion: (value: string) => void;
    addOption: (id: string, value: string) => void;
    removeOption: (id: string) => void;
    resetOptions: () => void;
};

type OptionsContextProps = {
    children: React.ReactNode;
};

export const OptionsContext = createContext<OptionsContextData>({ options: [], minOptions: 0, maxOptions: 0, question: '', setQuestion: () => undefined, addOption: () => undefined, removeOption: () => undefined, resetOptions: () => undefined, });

export const OptionsWrapper = ({ children }: OptionsContextProps): JSX.Element => {
    const [question, setQuestion] = useState<string>('');
    const [options, setOptions] = useState<Option[]>(defaultOptions);

    const addOption = (id: string, value: string): void => {
        setOptions([...options, { id, value, votes: 0 }]);
    };

    const removeOption = (id: string): void => {
        const filteredOptions = options.filter((option) => option.id !== id);
        setOptions(filteredOptions);
    };

    const resetOptions = (): void => {
        setQuestion('');
        setOptions(defaultOptions);
    };

    return (
        <OptionsContext.Provider value={{ question, options, minOptions, maxOptions, setQuestion, addOption, removeOption, resetOptions }}>
            {children}
        </OptionsContext.Provider>
    );
};

export const useOptionsContext = (): OptionsContextData => {
    return useContext(OptionsContext);
};