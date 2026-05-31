import type { JSX } from 'react';
import style from './button.module.css';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export const LoginButton = ({ text }: ButtonProps): JSX.Element => {
  return (
    <div>
      <button className={style.login}>{text}</button>
    </div>
  );
};

export const RegisterButton = ({ text }: ButtonProps): JSX.Element => {
  return (
    <div>
      <button className={style.register}>{text}</button>
    </div>
  );
};
