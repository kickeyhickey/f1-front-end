import { useAuth } from '@clerk/clerk-react';
import { useEffect, type ReactNode } from 'react';
import { setAuthToken } from '../../api/axiosConfig';

interface AuthTokenSyncProps {
  children: ReactNode;
}

export const AuthTokenSync = ({ children }: AuthTokenSyncProps) => {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const syncToken = async () => {
      if (isSignedIn) {
        const token = await getToken();
        setAuthToken(token);
      } else {
        setAuthToken(null);
      }
    };

    syncToken();
  }, [getToken, isSignedIn]);

  return <>{children}</>;
};
