import React from 'react';
import './style.css';

interface IButtonProps {
  children: JSX.Element | string | number | null | undefined;
  href?: string;
  type?: "button" | "reset" | "submit";
  className?: string;
};

const Button: React.FC<IButtonProps> = ({children, href, type, className, ...props}) => {
  const As = href ? 'a' : 'button';
    return (
        <As {...props} {...href ? { href } : {}} {...type ? { type } : {}} className={`btn ${className}`}>
            {children}
        </As>
    );
};

export default Button;
