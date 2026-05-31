import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css';
import Router from './router/router.tsx';
import { AuthTokenSync } from './components/auth-token/auth-token-sync.component.tsx';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing Clerk Publishable Key');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <AuthTokenSync>
        <Router />
      </AuthTokenSync>
    </ClerkProvider>
  </StrictMode>
);
