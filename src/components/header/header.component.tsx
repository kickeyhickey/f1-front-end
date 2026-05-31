import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import style from './header.module.css';

export default function MainHeader() {
  return (
    <div className={style.header}>
      <span>F1</span>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
