import { fireEvent, getByRole, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PollCreator } from '.';
import { OptionsWrapper, Option, OptionsContextProps } from '../OptionsContext';

const defaultOptions: Option[] = [
    {
        id: '1',
        placeholder: 'Option 1',
        votes: 0,
    },
    {
        id: '2',
        placeholder: 'Option 2',
        votes: 0,
    },
];

const maxOptions = [
    {
        id: '1',
        placeholder: 'Option 1',
        votes: 0,
    },
    {
        id: '2',
        placeholder: 'Option 2',
        votes: 0,
    }, {
        id: '3',
        placeholder: 'Option 3',
        votes: 0,
    },
    {
        id: '4',
        placeholder: 'Option 4',
        votes: 0,
    }, {
        id: '5',
        placeholder: 'Option 5',
        votes: 0,
    },
    {
        id: '6',
        placeholder: 'Option 6',
        votes: 0,
    }, {
        id: '7',
        placeholder: 'Option 7',
        votes: 0,
    },
    {
        id: '8',
        placeholder: 'Option 8',
        votes: 0,
    }, {
        id: '9',
        placeholder: 'Option 9',
        votes: 0,
    },
    {
        id: '10',
        placeholder: 'Option 10',
        votes: 0,
    },
];

const setUp = (props?: Omit<OptionsContextProps, 'children' | 'defaultOptions'>, options: Option[] = defaultOptions): void => {
    render(
        <OptionsWrapper defaultOptions={options} {...props}>
            <PollCreator />
        </OptionsWrapper>
    );
};

describe('PollCreator component tests', () => {
    test('Renders questionPlaceholder when quesion is not set', () => {
        const questionPlaceholder = 'This is the placeholder';
        setUp({ questionPlaceholder });
        const placeholder = screen.getByPlaceholderText(questionPlaceholder);
        expect(placeholder).toBeInTheDocument();
    });
    test('Renders all option elements', () => {
        setUp();
        const options = screen.getAllByTestId('poll-creator-option');
        expect(options.length).toBe(2);
    });
    test('Renders default options placeholders', () => {
        setUp();
        const option1 = screen.getByPlaceholderText(defaultOptions[0].placeholder as string);
        const option2 = screen.getByPlaceholderText(defaultOptions[1].placeholder as string);
        expect(option1).toBeInTheDocument();
        expect(option2).toBeInTheDocument();
    });
    test('Option can be updated', () => {
        setUp();
        const option1 = screen.getByPlaceholderText(defaultOptions[0].placeholder as string);
        const value = 'Updated value';
        userEvent.type(option1, value);
        expect(option1).toHaveValue(value);
    });
    test('Option can\'t be removed when number of options equals minOptions', () => {
        setUp();
        const option1 = screen.getAllByTestId('poll-creator-option')[0];
        const removeButton = getByRole(option1, 'button');
        userEvent.click(removeButton);
        const options = screen.getAllByTestId('poll-creator-option');
        expect(options.length).toBe(2);
    });
    test('Option buttons are disabled when number of options equals minOptions', () => {
        setUp();
        const option1 = screen.getAllByTestId('poll-creator-option')[0];
        const removeButton = getByRole(option1, 'button');
        expect(removeButton).toBeDisabled();
    });
    test('New option can be added by pressing Enter after filling text input', () => {
        setUp();
        const addOption = screen.getByTestId('poll-creator-add-option');
        const optionContent = 'new option';
        const input = getByRole(addOption, 'textbox');
        userEvent.type(input, optionContent);
        fireEvent.keyDown(input, { key: 'Enter' });
        waitFor(() => {
            const options = screen.getAllByTestId('poll-creator-option');
            expect(options.length).toBe(3);
            expect(options[2]).toHaveTextContent(optionContent);
        });
    });
    test('New option can be added by pressing add button after filling text input', () => {
        setUp();
        const addOption = screen.getByTestId('poll-creator-add-option');
        const optionContent = 'new option';
        const input = getByRole(addOption, 'textbox');
        const button = getByRole(addOption, 'button');
        userEvent.type(input, optionContent);
        userEvent.click(button);
        waitFor(() => {
            const options = screen.getAllByTestId('poll-creator-option');
            expect(options.length).toBe(3);
            expect(options[2]).toHaveTextContent(optionContent);
        });
    });
    test('New option can\'t be added by pressing Enter when text input is empty', () => {
        setUp();
        const addOption = screen.getByTestId('poll-creator-add-option');
        const input = getByRole(addOption, 'textbox');
        fireEvent.keyDown(input, { key: 'Enter' });
        waitFor(() => {
            const options = screen.getAllByTestId('poll-creator-option');
            expect(options.length).toBe(2);
        });
    });
    test('New option can\'t be added by pressing add button when text input is empty', () => {
        setUp();
        const addOption = screen.getByTestId('poll-creator-add-option');
        const button = getByRole(addOption, 'button');
        userEvent.click(button);
        waitFor(() => {
            const options = screen.getAllByTestId('poll-creator-option');
            expect(options.length).toBe(2);
        });
    });
    test('Option can be removed when number of options is greater than minOptions', () => {
        setUp();
        const addOption = screen.getByTestId('poll-creator-add-option');
        const optionContent = 'new option';
        const input = getByRole(addOption, 'textbox');
        userEvent.type(input, optionContent);
        fireEvent.keyDown(input, { key: 'Enter' });
        const option1 = screen.getAllByTestId('poll-creator-option')[0];
        const removeButton = getByRole(option1, 'button');
        userEvent.click(removeButton);
        waitFor(() => {
            const options = screen.getAllByTestId('poll-creator-option');
            expect(options.length).toBe(2);
        });
    });
    test('Counter shows current number of options', () => {
        setUp();
        const counter = screen.getByText('2 / 10 possible answers');
        expect(counter).toBeInTheDocument();
    });
    test('Counter updates value after adding new option', () => {
        setUp();
        const addOption = screen.getByTestId('poll-creator-add-option');
        const optionContent = 'new option';
        const input = getByRole(addOption, 'textbox');
        userEvent.type(input, optionContent);
        fireEvent.keyDown(input, { key: 'Enter' });
        waitFor(() => {
            const counter = screen.getByText('3 / 10 possible answers');
            expect(counter).toBeInTheDocument();
        });
    });
    test('Reset button removes changes on default options', () => {
        setUp();
        const option1 = screen.getByPlaceholderText(defaultOptions[0].placeholder as string);
        const option2 = screen.getByPlaceholderText(defaultOptions[1].placeholder as string);
        userEvent.type(option1, 'Updated value');
        userEvent.type(option2, 'Another value');
        const reset = screen.getByTestId('poll-creator-reset');
        userEvent.click(reset);
        waitFor(() => {
            const option1 = screen.getByPlaceholderText(defaultOptions[0].placeholder as string);
            const option2 = screen.getByPlaceholderText(defaultOptions[1].placeholder as string);
            expect(option1).toHaveValue('');
            expect(option2).toHaveValue('');
        });
    });
    test('Reset button removes added options', () => {
        setUp();
        const addOption = screen.getByTestId('poll-creator-add-option');
        const optionContent = 'new option';
        const input = getByRole(addOption, 'textbox');
        userEvent.type(input, optionContent);
        fireEvent.keyDown(input, { key: 'Enter' });
        const reset = screen.getByTestId('poll-creator-reset');
        userEvent.click(reset);
        waitFor(() => {
            const options = screen.getAllByTestId('poll-creator-option');
            expect(options.length).toBe(2);
        });
    });
    test('Counter updates after reset', () => {
        setUp();
        const addOption = screen.getByTestId('poll-creator-add-option');
        const optionContent = 'new option';
        const input = getByRole(addOption, 'textbox');
        userEvent.type(input, optionContent);
        fireEvent.keyDown(input, { key: 'Enter' });
        const reset = screen.getByTestId('poll-creator-reset');
        userEvent.click(reset);
        waitFor(() => {
            const counter = screen.getByText('2 / 10 possible answers');
            expect(counter).toBeInTheDocument();
        });
    });
    test('Reset removes changes to question input', () => {
        const questionPlaceholder = 'This is the placeholder';
        setUp({ questionPlaceholder });
        const questionInput = screen.getByPlaceholderText(questionPlaceholder);
        userEvent.type(questionInput, 'New question input');
        const reset = screen.getByTestId('poll-creator-reset');
        userEvent.click(reset);
        waitFor(() => {
            const questionInput = screen.getByPlaceholderText(questionPlaceholder);
            expect(questionInput).toHaveDisplayValue('');
        });
    });
    test('Add button is disabled when max number of options is achieved', () => {
        setUp({}, maxOptions);
        const addOption = screen.getByTestId('poll-creator-add-option');
        const button = getByRole(addOption, 'button');
        expect(button).toBeDisabled();
    });
    test('Add option input is disabled when max number of options is achieved', () => {
        setUp({}, maxOptions);
        const addOption = screen.getByTestId('poll-creator-add-option');
        const input = getByRole(addOption, 'textbox');
        expect(input).toBeDisabled();
    });
});

