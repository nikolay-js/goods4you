import React, { MouseEventHandler } from 'react';
import './style.css';

interface IButtonProps {
  children: JSX.Element | string | number | null | undefined;
  href?: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

const Button: React.FC<IButtonProps> = ({ children, href, type = 'button', disabled, className, onClick, ...props }) => {
  const As = href ? 'a' : 'button';
  return (
    <As
      {...props}
      {...href ? { href } : {}}
      {...type ? { type } : {}}
      {...disabled ? { disabled } : {}}
      {...onClick ? { onClick } : {}}
      className={`btn${className ? ` ${className}` : ''}`}
    >
      {children}
    </As>
  );
};

export default Button;
