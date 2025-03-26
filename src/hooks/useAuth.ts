import  { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../firebase/config';
import { getUserRole } from '../services/authService';

interface AuthState {
  currentUser: User | null;
  userRole: string;
  loading: boolean;
}

export const useAuth = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    currentUser: null,
    userRole: 'user',
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const role = await getUserRole(user.uid);
        setState({
          currentUser: user,
          userRole: role,
          loading: false,
        });
      } else {
        setState({
          currentUser: null,
          userRole: 'user',
          loading: false,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return state;
};
 