import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Outlet } from 'react-router';

export default function ProtectedRoutes() {
  return (
    <>
      {/* If the user is signed in , rended the child routes */}
      <SignedIn>
        <Outlet />
      </SignedIn>

      {/* if the user is signed out redirect them */}
      <SignedOut>
        <RedirectToSignIn signInFallbackRedirectUrl={window.location.pathname} />
      </SignedOut>
    </>
  );
}
