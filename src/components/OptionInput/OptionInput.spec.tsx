import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OptionInput, OptionProps } from '.';

type SetUpResult = {
    input: HTMLElement;
    button: HTMLElement;
}

const setUp = (props?: OptionProps): SetUpResult => {
    render(<OptionInput {...props} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    return { input, button };
};

describe('OptionInput component tests', () => {
    test('Button contains X as default content', () => {
        const { button } = setUp();
        expect(button.textContent).toBe('X');
    });

    test('Button contains passed content', () => {
        const { button } = setUp({ button: { content: 'Another content' } });
        expect(button.textContent).toBe('Another content');
    });

    test('Button has primary type as default', () => {
        const { button } = setUp();
        expect(button.classList).toContain('primary');
    });

    test('Button has warning type set', () => {
        const { button } = setUp({ button: { type: 'warning' } });
        expect(button.classList).toContain('warning');
    });

    test('Button has danger type set', () => {
        const { button } = setUp({ button: { type: 'danger' } });
        expect(button.classList).toContain('danger');
    });

    test('button does not have className big set as default', () => {
        const { button } = setUp();
        expect(button.classList).not.toContain('big');
    });

    test('button has className big set as when prop big is set to true', () => {
        const { button } = setUp({ button: { big: true } });
        expect(button.classList).toContain('big');
    });

    test('button contains passed className', () => {
        const { button } = setUp({ button: { className: 'test' } });
        expect(button.classList).toContain('test');
    });

    test('button is not disabled by default', () => {
        const { button } = setUp();
        expect(button).not.toBeDisabled()
    });

    test('button is disabled when disabled is set to true', () => {
        const { button } = setUp({ button: { disabled: true } });
        expect(button).toBeDisabled();
    });

    test('button calls onClick function when clicked', () => {
        const handleClick = jest.fn();
        const { button } = setUp({ button: { onClick: handleClick } });
        userEvent.click(button);
        expect(handleClick).toBeCalled();
    });

    test('input does not contain placeholder as default', () => {
        const { input } = setUp();
        expect(input).not.toHaveAttribute('placeholder');
    });

    test('input contains passed placeholder', () => {
        const { input } = setUp({ placeholder: 'test' });
        expect(input).toHaveAttribute('placeholder', 'test');
    });

    test('input has empty string value as default', () => {
        const { input } = setUp();
        expect(input).toHaveValue('');
    });

    test('input contains passed value', () => {
        const { input } = setUp({ value: 'test' });
        expect(input).toHaveValue('test');
    });

    test('input is not disabled by default', () => {
        const { input } = setUp();
        expect(input).not.toBeDisabled();
    });

    test('input is disabled when property disabled is set to true', () => {
        const { input } = setUp({ disabled: true });
        expect(input).toBeDisabled();
    });

    test('input maxLength is set to 80 by default', () => {
        const { input } = setUp();
        expect(input).toHaveAttribute('maxLength', '80');
    });

    test('input is passing current value to onChange method', () => {
        const onChange = jest.fn();
        const { input } = setUp({ onChange });
        userEvent.type(input, 'New value')
        waitFor(() => {
            expect(onChange).toBeCalledWith('New value')
        }, { timeout: 300 });
    });

    test('input is calling onEnter method', () => {
        const onEnter = jest.fn();
        const { input } = setUp({ onEnter });
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(onEnter).toBeCalled();
    });
});

