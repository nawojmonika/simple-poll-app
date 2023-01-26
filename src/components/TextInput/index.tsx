
export type TextInputProps = {
    placeholder?: string;
}

export const TextInput = ({ placeholder }: TextInputProps) => {
    return <input placeholder={placeholder} />
}