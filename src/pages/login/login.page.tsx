import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import F1Image from '../../assets/images/f1.svg';
import { LoginButton, RegisterButton } from '../../components/buttons/button.compoent';
import { Logo } from '../../components/img/img.component';
import style from './login.module.css';

export default function Login() {
  const onSubmit = () => {
    return console.warn('here');
  };
  return (
    <div className={style.background}>
      <div style={{ paddingBottom: '100px' }}>
        <Logo src={F1Image} />
      </div>
      <div style={{ paddingBottom: '32px' }}>
        <SignInButton mode="modal">
          <LoginButton text="Login" onClick={onSubmit} />
        </SignInButton>
      </div>
      <SignUpButton mode="modal">
        <RegisterButton text="Sign Up" onClick={onSubmit} />
      </SignUpButton>
    </div>
  );
}
