import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react';
import './style.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref: string;
}

const ComponentInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
  return (
    <input {...props} ref={ref} className="input" />
  );
};

const Input = React.forwardRef(ComponentInput);

export default Input;