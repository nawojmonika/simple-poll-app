import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { OptionProps } from '../OptionInput';

const minOptions = 2;
const maxOptions = 10;

const defaultOptions: OptionProps[] = [
    {
        id: uuidv4(),
        placeholder: 'First option',
    },
    {
        id: uuidv4(),
        placeholder: 'Second option',
    },
];

type OptionsContextData = {
    options: OptionProps[];
    addOption: (id: string, value: string) => void;
    removeOption: (id: string) => void;
    minOptions?: number;
    maxOptions?: number;
};

type OptionsContextProps = {
    children: React.ReactNode;
};

export const OptionsContext = createContext<OptionsContextData>({ options: [], addOption: () => undefined, removeOption: () => undefined, });

export const OptionsWrapper = ({ children }: OptionsContextProps): JSX.Element => {
    const [options, setOptions] = useState<OptionProps[]>(defaultOptions);

    const addOption = (id: string, value: string): void => {
        setOptions([...options, { id, value }]);
    };

    const removeOption = (id: string): void => {
        const filteredOptions = options.filter((option) => option.id !== id);
        setOptions(filteredOptions);
    };

    return (
        <OptionsContext.Provider value={{ options, minOptions, maxOptions, addOption, removeOption }}>
            {children}
        </OptionsContext.Provider>
    );
};

export const useOptionsContext = (): OptionsContextData => {
    return useContext(OptionsContext);
};