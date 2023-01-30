import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TextInput, TextInputProps } from './';
import userEvent from '@testing-library/user-event';

type SetUpResult = {
    input: HTMLElement;
}

const setUp = (props?: TextInputProps): SetUpResult => {
    render(<TextInput {...props} />);
    const input = screen.getByRole('textbox');
    return { input };
};

describe('TextInput component tests', () => {
    test('input contains passed className', () => {
        const { input } = setUp({ className: 'test' });
        expect(input.classList).toContain('test');
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
    test('input maxLength is set by passed value', () => {
        const { input } = setUp({ maxLength: 120 });
        expect(input).toHaveAttribute('maxLength', '120');
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