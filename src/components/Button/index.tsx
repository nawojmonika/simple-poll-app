import { clsx } from 'clsx';
import styles from './Button.module.css';

export type ButtonType = 'primary' | 'danger' | 'warning';

export type ButtonProps = {
    type?: ButtonType;
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
    onClick: () => void;
};

export const Button = ({ type = 'primary', className, children, onClick, disabled = false }: ButtonProps): JSX.Element => {
    return <button className={clsx(styles.button, styles[type], className)} onClick={onClick} disabled={disabled}>{children}</button>
}