import { useAuth, useClerk } from '@clerk/clerk-react';
import F1Image from '../../assets/images/f1.svg';
import { LoginButton, RegisterButton } from '../../components/buttons/button.compoent';
import { Logo } from '../../components/img/img.component';
import style from './login.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Login() {
  const { isSignedIn } = useAuth();
  const { openSignIn, openSignUp } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/home');
    }
  }, [isSignedIn, navigate]);

  const handleSignIn = () => {
    openSignIn({
      afterSignInUrl: '/home',
      redirectUrl: '/home',
    });
  };

  const handleSignUp = () => {
    openSignUp({
      afterSignUpUrl: '/home',
      redirectUrl: '/home',
    });
  };

  return (
    <div className={style.background}>
      <div style={{ paddingBottom: '100px' }}>
        <Logo src={F1Image} />
      </div>
      <div style={{ paddingBottom: '32px' }}>
        <LoginButton text="Login" onClick={handleSignIn} />
      </div>
      <RegisterButton text="Sign Up" onClick={handleSignUp} />
    </div>
  );
}
