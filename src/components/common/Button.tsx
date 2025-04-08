"use client";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}


export default function Button({ children, onClick, className, disabled }: ButtonProps) {
    return (
        <button className={`button ${className || ""}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
};