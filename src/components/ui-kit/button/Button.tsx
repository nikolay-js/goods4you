import React, { MouseEventHandler } from 'react';
import './style.css';

interface IButtonProps {
  children: JSX.Element | string | number | null | undefined;
  href?: string;
  type?: "button" | "reset" | "submit";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

const Button: React.FC<IButtonProps> = ({children, href, type, className, onClick, ...props}) => {
  const As = href ? 'a' : 'button';
    return (
        <As {...props} {...href ? { href } : {}} {...type ? { type } : {}} {...onClick ? { onClick } : {}} className={`btn ${className}`}>
            {children}
        </As>
    );
};

export default Button;
