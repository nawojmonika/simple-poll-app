import { render, screen } from '@testing-library/react';
import { PollResult } from '.';
import { OptionsContextProps, OptionsWrapper, Option } from '../OptionsContext';

const defaultOptions: Option[] = [
    {
        id: '1',
        value: 'Option 1',
        votes: 10,
    },
    {
        id: '2',
        value: 'Option 2',
        votes: 20,
    },
];

const setUp = (props?: Omit<OptionsContextProps, 'children' | 'defaultOptions'>): void => {
    render(
        <OptionsWrapper defaultOptions={defaultOptions} {...props}>
            <PollResult />
        </OptionsWrapper>
    );
};

describe('PollResult component tests', () => {
    test('total votes is counted', () => {
        setUp();
        const total = screen.getByText('Total votes: 30');
        expect(total).toBeInTheDocument();
    });
});