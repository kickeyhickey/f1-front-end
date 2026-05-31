import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import style from './header.module.css';

export default function MainHeader() {
  return (
    <div className={style.header}>
      <span>F1</span>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <SignedOut>
          <SignInButton mode="modal">
            <button
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                borderRadius: '6px',
                border: '1px solid #ccc',
                background: '#fff',
              }}
            >
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                borderRadius: '6px',
                border: 'none',
                background: '#0070f3',
                color: '#fff',
              }}
            >
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
