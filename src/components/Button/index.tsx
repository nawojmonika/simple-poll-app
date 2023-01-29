import { clsx } from 'clsx';
import styles from './Button.module.css';


export type ButtonProps = {
    type?: 'primary' | 'warning' | 'danger';
    big?: boolean;
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
};

export const Button = ({ type = 'primary', big = false, className, children, onClick, disabled = false }: ButtonProps): JSX.Element => {
    return <button className={clsx(styles.button, styles[type], big && styles.big, className)} onClick={onClick} disabled={disabled}>{children}</button>
}