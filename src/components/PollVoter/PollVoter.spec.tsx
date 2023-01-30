import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PollVoter } from '.';
import { OptionsContextProps, OptionsWrapper, Option } from '../OptionsContext';

const defaultOptions: Option[] = [
    {
        id: '1',
        value: 'Option 1',
        votes: 0,
    },
    {
        id: '2',
        placeholder: 'Placeholder 2',
        votes: 0,
    },
    {
        id: '3',
        value: 'Option 3',
        placeholder: 'Placeholder 3',
        votes: 0,
    },
];

const setUp = (props?: Omit<OptionsContextProps, 'children' | 'defaultOptions'>): void => {
    render(
        <OptionsWrapper defaultOptions={defaultOptions} {...props}>
            <PollVoter />
        </OptionsWrapper>
    );
};

describe('PollVoter component tests', () => {
    test('compmonent renders question placeholder as header', () => {
        const questionPlaceholder = 'Lorem Ipsum';
        setUp({ questionPlaceholder });
        const element = screen.getByText(questionPlaceholder);
        expect(element).toBeInTheDocument();
    });
    test('vote button is disabled when no option is chosen', () => {
        setUp();
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });
    test('vote button is enabled when option is chosen', () => {
        setUp();
        const options = screen.getAllByRole('radio');
        userEvent.click(options[0]);
        const button = screen.getByRole('button');
        expect(button).toBeEnabled();
    });
});