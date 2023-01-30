import { clsx } from 'clsx';
import styles from './Button.module.css';


export type ButtonProps = {
    type?: 'primary' | 'warning' | 'danger';
    big?: boolean;
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
    testId?: string;
    onClick?: () => void;
};

export const Button = ({ className, children, onClick, type = 'primary', big = false, disabled = false, testId = '' }: ButtonProps): JSX.Element => {
    return <button data-testid={testId} className={clsx(styles.button, styles[type], big && styles.big, className)} onClick={onClick} disabled={disabled}>{children}</button>
};