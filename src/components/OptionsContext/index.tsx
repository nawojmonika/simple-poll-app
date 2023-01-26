import { createContext, useContext, useState } from 'react';
import { TextInputProps } from '../TextInput';
import { v4 as uuidv4 } from 'uuid';

export type OptionProps = Exclude<TextInputProps, 'onChange'> & {
    id?: string;
    buttonContent?: string;
    onButtonClick?: (id: string, value: string) => void;
};

const defaultOptions: OptionProps[] = [
    {
        id: uuidv4(),
        placeholder: 'First option',
    },
    {
        id: uuidv4(),
        placeholder: 'Second option',
    }
];

type OptionsContextData = {
    options: OptionProps[];
    addOption: (id: string, value: string) => void;
    removeOption: (id: string) => void;
};

type OptionsContextProps = {
    children: React.ReactNode;
}

export const OptionsContext = createContext<OptionsContextData>({ options: defaultOptions, addOption: () => undefined, removeOption: () => undefined });

export const OptionsWrapper = ({ children }: OptionsContextProps): JSX.Element => {
    const [options, setOptions] = useState<OptionProps[]>(defaultOptions);

    const addOption = (id: string, value: string): void => {
        setOptions([...options, { id, value }]);
    };

    const removeOption = (id: string): void => {
        const filteredOptions = options.filter((option) => option.id !== id);
        setOptions(filteredOptions);
    }

    return (
        <OptionsContext.Provider value={{ options, addOption, removeOption }}>
            {children}
        </OptionsContext.Provider>
    );
}

export const useOptionsContext = (): OptionsContextData => {
    return useContext(OptionsContext);
}