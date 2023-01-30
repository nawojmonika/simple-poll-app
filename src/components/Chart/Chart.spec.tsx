import { render, screen, waitFor } from '@testing-library/react';
import { Chart, ChartData } from './';

const defaultOptions: ChartData[] = [
    {
        value: 'Option 1',
        votes: 0,
    },
    {
        value: 'Option 2',
        votes: 2137,
    },
    {
        value: 'Option 3',
        votes: 0,
    },
];

const caption = 'Lorem Ipsum';

const setUp = (): void => {
    render(<Chart caption={caption} data={defaultOptions} />);
};

describe('Chart component tests', () => {
    test('renders caption', () => {
        setUp();
        waitFor(() => {
            const element = screen.getByText(caption);
            expect(element).toBeInTheDocument();
        });
    });
    test('renders option labels', () => {
        setUp();
        waitFor(() => {
            const option1 = screen.getByText(defaultOptions[0].value);
            const option2 = screen.getByText(defaultOptions[1].value);
            const option3 = screen.getByText(defaultOptions[2].value);
            expect(option1).toBeInTheDocument();
            expect(option2).toBeInTheDocument();
            expect(option3).toBeInTheDocument();
        });
    });
    test('renders option vote count', () => {
        setUp();
        waitFor(() => {
            const element = screen.getByText('2137');
            expect(element).toBeInTheDocument();
        });
    });
});