import { TextInput, TextInputProps } from '../TextInput';
import './OptionInput.css';

export type OptionProps = TextInputProps & {
    id: string;
    buttonContent?: string;
    onButtonClick?: (id: string) => void;
};

export const OptionInput = ({ id, placeholder, buttonContent, onButtonClick }: OptionProps): JSX.Element => {
    const handleButtonClick = () => {
        onButtonClick && onButtonClick(id);
    }
    return (
        <div className='option'>
            <TextInput placeholder={placeholder} />
            <button className='button' onClick={handleButtonClick}>{buttonContent ? buttonContent : 'X'}</button>
        </div>
    );
}