
export type TextInputProps = {
    placeholder?: string;
}

export const TextInput = ({ placeholder }: TextInputProps): JSX.Element => {
    return <input placeholder={placeholder} />
}