import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Option } from '../OptionsContext';
import { RadioButtonGroup } from './';

type SetUpResult = {
    onChange: jest.Mock<any, any>;
};

const options: Option[] = [
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

const name = 'Lorem Ipsum';

const setUp = (): SetUpResult => {
    const onChange = jest.fn();
    render(<RadioButtonGroup name={name} options={options} onChange={onChange} />);
    return ({ onChange });
};

describe('RadioButtonGroup component tests', () => {
    test('input has set passed name', () => {
        setUp();
        const options = screen.getAllByRole('radio');
        expect(options[0]).toHaveAttribute('name', name);
    });

    test('component renders all passed options', () => {
        setUp();
        const options = screen.getAllByRole('radio');
        expect(options.length).toBe(3);
    });

    test('component renders value as input label if provided', () => {
        setUp();
        const option = screen.getByLabelText(options[0].value as string);
        expect(option).toBeInTheDocument();
    });

    test('component renders placeholder as input label if value is not provided', () => {
        setUp();
        const option = screen.getByLabelText(options[1].placeholder as string);
        expect(option).toBeInTheDocument();
    });

    test('component renders value as input label if both value and placeholder is provided', () => {
        setUp();
        const option = screen.getByLabelText(options[2].value as string);
        expect(option).toBeInTheDocument();
    });

    test('component calls onChange method when option is chosen', () => {
        const { onChange } = setUp();
        const option = screen.getByLabelText(options[0].value as string);
        userEvent.click(option);
        expect(onChange).toBeCalled();
    });

    test('component calls onChange method with option id', () => {
        const { onChange } = setUp();
        const option = screen.getByLabelText(options[0].value as string);
        userEvent.click(option);
        expect(onChange).toBeCalledWith(options[0].id);
    });
});