import { fireEvent, getAllByTestId, getByRole, render, screen, waitFor } from '@testing-library/react';
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

const setUp = (props?: Omit<OptionsContextProps, 'children' | 'defaultOptions'>): void => {
    render(
        <OptionsWrapper defaultOptions={defaultOptions} {...props}>
            <PollCreator />
        </OptionsWrapper>
    );
};

describe('PollCreator tests', () => {
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
});

