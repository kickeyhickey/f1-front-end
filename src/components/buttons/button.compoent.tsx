import type { JSX } from 'react';
import style from './button.module.css';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export const LoginButton = ({ text, onClick }: ButtonProps): JSX.Element => {
  return (
    <div>
      <button onClick={onClick} className={style.login}>
        {text}
      </button>
    </div>
  );
};

export const RegisterButton = ({ text, onClick }: ButtonProps): JSX.Element => {
  return (
    <div>
      <button onClick={onClick} className={style.register}>
        {text}
      </button>
    </div>
  );
};
