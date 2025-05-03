import { ButtonHTMLAttributes, ReactNode } from 'react';
import '@/styles/common.css';
import { useDevice } from '@/contexts/DeviceProvider';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  className?: string;
}

export default function Button({
  children,
  size = 'medium',
  fullWidth = false,
  className = '',
  ...rest
}: ButtonProps) {

    const { isMobile } = useDevice();

  const baseClasses = `relative font-medium transition-all duration-300 ease-in-out bg-black/10 text-white ${isMobile ? 'border-3' : 'border-2'} border-white/70 hover:border-white button-glow`;
  
  const sizeClasses = {
    small: 'py-1 px-3 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-4 px-10 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  return (
    <button className={buttonClasses + ' cursor-pointer'} {...rest}>
      {children}
    </button>
  );
}
