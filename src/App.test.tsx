import React from 'react';
import { fireEvent, getByRole, getByText, queryByText, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

type SetUpResult = {
  addOption: HTMLElement;
  resetButton: HTMLElement;
  voteButton: HTMLElement;
};

const setUp = (): SetUpResult => {
  render(<App />);
  const addOption = screen.getByTestId('poll-creator-add-option');
  const resetButton = screen.getByTestId('poll-creator-reset');
  const voteButton = screen.getByTestId('poll-voter-button');
  return ({
    addOption,
    resetButton,
    voteButton
  });
}

const questionPlaceholder = 'What is the question?';

describe('App component tests', () => {
  test('renders Sir Vote-a-lot header', () => {
    setUp();
    const header = screen.getByText(/Sir Vote-a-lot/i);
    expect(header).toBeInTheDocument();
  });

  test('question is updated in every section', () => {
    setUp();
    const questionInput = screen.getByPlaceholderText(questionPlaceholder);
    const updatedValue = 'This is updated question value';
    userEvent.type(questionInput, updatedValue);
    waitFor(() => {
      const header2 = screen.getByRole('heading', { level: 2 });
      expect(header2).toHaveValue(updatedValue);
      const chart = screen.getByRole('graphics-document');
      const chartCaption = getByText(chart, updatedValue);
      expect(chartCaption).toBeInTheDocument();
    });
  });

  test('option value is updated in every section', () => {
    setUp();
    const option = screen.getAllByTestId('poll-creator-option')[0];
    const updatedValue = 'Updated option value';
    userEvent.type(option, updatedValue);
    waitFor(() => {
      const radioOption = screen.getByLabelText(updatedValue);
      expect(radioOption).toBeInTheDocument();
      const chart = screen.getByRole('graphics-document');
      const optionLabel = getByText(chart, updatedValue);
      expect(optionLabel).toBeInTheDocument();
    });
  });

  test('new option is added to every section', () => {
    const { addOption } = setUp();
    const optionContent = 'new option';
    const input = getByRole(addOption, 'textbox');
    userEvent.type(input, optionContent);
    fireEvent.keyDown(input, { key: 'Enter' });
    waitFor(() => {
      const options = screen.getAllByTestId('poll-creator-option');
      expect(options.length).toBe(3);
      expect(options[2]).toHaveTextContent(optionContent);
      const radioOption = screen.getByLabelText(optionContent);
      expect(radioOption).toBeInTheDocument();
      const chart = screen.getByRole('graphics-document');
      const optionLabel = getByText(chart, optionContent);
      expect(optionLabel).toBeInTheDocument();
    });
  });

  test('option is removed from every section', () => {
    const { addOption } = setUp();
    const optionContent = 'new option';
    const input = getByRole(addOption, 'textbox');
    userEvent.type(input, optionContent);
    fireEvent.keyDown(input, { key: 'Enter' });
    waitFor(() => {
      const options = screen.getAllByTestId('poll-creator-option');
      expect(options.length).toBe(3);
      expect(options[2]).toHaveTextContent(optionContent);
      const radioOption = screen.getByLabelText(optionContent);
      expect(radioOption).toBeInTheDocument();
      const chart = screen.getByRole('graphics-document');
      const optionLabel = getByText(chart, optionContent);
      expect(optionLabel).toBeInTheDocument();
    });
    const optionInput = screen.getAllByTestId('poll-creator-option')[0];
    const removedLabel = getByRole(optionInput, 'textbox').getAttribute('placeholder');
    const deleteButton = getByRole(optionInput, 'button');
    deleteButton.click();
    waitFor(() => {
      const options = screen.getAllByTestId('poll-creator-option');
      expect(options.length).toBe(2);
      const radioOptions = screen.getAllByRole('radio');
      expect(radioOptions.length).toBe(2);
      const chart = screen.getByRole('graphics-document');
      const optionLabel = queryByText(chart, removedLabel as string);
      expect(optionLabel).not.toBeInTheDocument();
    });
  });

  test('question is reset in every section', () => {
    const { resetButton } = setUp();
    const questionInput = screen.getByPlaceholderText(questionPlaceholder);
    const updatedValue = 'This is updated question value';
    userEvent.type(questionInput, updatedValue);
    waitFor(() => {
      const header2 = screen.getByRole('heading', { level: 2 });
      expect(header2).toHaveValue(updatedValue);
      const chart = screen.getByRole('graphics-document');
      const chartCaption = getByText(chart, updatedValue);
      expect(chartCaption).toBeInTheDocument();
    });
    userEvent.click(resetButton);
    waitFor(() => {
      const questionInput = screen.getByPlaceholderText(questionPlaceholder);
      expect(questionInput).toHaveValue(null);
      const header2 = screen.getByRole('heading', { level: 2 });
      expect(header2).toHaveValue(questionPlaceholder);
      const chart = screen.getByRole('graphics-document');
      const chartCaption = getByText(chart, questionPlaceholder);
      expect(chartCaption).toBeInTheDocument();
    });
  });

  test('option value is reset in every section', () => {
    const { resetButton } = setUp();
    const option = screen.getAllByTestId('poll-creator-option')[0];
    const updatedValue = 'Updated option value';
    userEvent.type(option, updatedValue);
    waitFor(() => {
      const radioOption = screen.getByLabelText(updatedValue);
      expect(radioOption).toBeInTheDocument();
      const chart = screen.getByRole('graphics-document');
      const optionLabel = getByText(chart, updatedValue);
      expect(optionLabel).toBeInTheDocument();
    });
    resetButton.click();
    waitFor(() => {
      const option = screen.getAllByTestId('poll-creator-option')[0];
      expect(option).toHaveValue(null);
      const radioOption = screen.queryByLabelText(updatedValue);
      expect(radioOption).not.toBeInTheDocument();
      const chart = screen.getByRole('graphics-document');
      const optionLabel = queryByText(chart, updatedValue);
      expect(optionLabel).not.toBeInTheDocument();
    });
  });

  test('options length is reset to every section', () => {
    const { addOption, resetButton } = setUp();
    const optionContent = 'new option';
    const input = getByRole(addOption, 'textbox');
    userEvent.type(input, optionContent);
    fireEvent.keyDown(input, { key: 'Enter' });
    waitFor(() => {
      const options = screen.getAllByTestId('poll-creator-option');
      expect(options.length).toBe(3);
      expect(options[2]).toHaveTextContent(optionContent);
      const radioOptions = screen.getAllByRole('radio');
      expect(radioOptions.length).toBe(3);
      const radioOption = screen.getByLabelText(optionContent);
      expect(radioOption).toBeInTheDocument();
      const chart = screen.getByRole('graphics-document');
      const optionLabel = getByText(chart, optionContent);
      expect(optionLabel).toBeInTheDocument();
    });
    resetButton.click();
    waitFor(() => {
      const options = screen.getAllByTestId('poll-creator-option');
      expect(options.length).toBe(2);
      const radioOptions = screen.getAllByRole('radio');
      expect(radioOptions.length).toBe(2);
      const chart = screen.getByRole('graphics-document');
      const optionLabel = queryByText(chart, optionContent);
      expect(optionLabel).not.toBeInTheDocument();
    });
  });

  test('vote is updating the chart section', () => {
    const { voteButton } = setUp();
    const radioOptions = screen.getAllByRole('radio');
    radioOptions[0].click();
    voteButton.click();
    waitFor(() => {
      const total = screen.getByText('Total votes: 1');
      expect(total).toBeInTheDocument();
    });
  });

  test('vote count is reset by the reset button', () => {
    const { voteButton, resetButton } = setUp();
    const radioOptions = screen.getAllByRole('radio');
    radioOptions[0].click();
    voteButton.click();
    waitFor(() => {
      const total = screen.getByText('Total votes: 1');
      expect(total).toBeInTheDocument();
    });
    resetButton.click();
    waitFor(() => {
      const total = screen.getByText('Total votes: 0');
      expect(total).toBeInTheDocument();
    });
  });
});