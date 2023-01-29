import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button, ButtonProps } from './';
import userEvent from '@testing-library/user-event';

const defaultContent = 'This is button content';

type SetUpResult = {
    button: HTMLElement;
}

const setUp = (props?: Omit<ButtonProps, 'children'>): SetUpResult => {
    render(<Button {...props}>{defaultContent}</Button>);
    const button = screen.getByRole('button');
    return { button };
};

describe('Button component tests', () => {
    test('renders button content', () => {
        setUp();
        const content = screen.getByText(defaultContent);
        expect(content).toBeInTheDocument();
    });
    test('button has primary type className as default', () => {
        const { button } = setUp();
        expect(button.classList).toContain('primary');
    });
    test('button has primary type className when type is passed', () => {
        const { button } = setUp();
        expect(button.classList).toContain('primary');
    });
    test('button has warning type className when type is passed', () => {
        const { button } = setUp({ type: 'warning' });
        expect(button.classList).toContain('warning');
    });
    test('button has danger type className when type is passed', () => {
        const { button } = setUp({ type: 'danger' });
        expect(button.classList).toContain('danger');
    });
    test('button does not have className big set as default', () => {
        const { button } = setUp();
        expect(button.classList).not.toContain('big');
    });
    test('button has className big set as when prop big is set to true', () => {
        const { button } = setUp({ big: true });
        expect(button.classList).toContain('big');
    });
    test('button contains passed className', () => {
        const { button } = setUp({ className: 'test' });
        expect(button.classList).toContain('test');
    });
    test('button is not disabled by default', () => {
        const { button } = setUp();
        expect(button).not.toBeDisabled()
    });
    test('button is disabled when disabled is set to true', () => {
        const { button } = setUp({ disabled: true });
        expect(button).toBeDisabled();
    });
    test('button calls onClick function when clicked', () => {
        const handleClick = jest.fn();
        const { button } = setUp({ onClick: handleClick });
        userEvent.click(button);
        expect(handleClick).toBeCalled();
    });
    test('button does not call onClick function when disabled', () => {
        const handleClick = jest.fn();
        const { button } = setUp({ onClick: handleClick, disabled: true });
        userEvent.click(button);
        expect(handleClick).not.toBeCalled();
    });
});