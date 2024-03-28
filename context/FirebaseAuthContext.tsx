// FirebaseAuthContext.tsx
import {
  FC,
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

type User = FirebaseAuthTypes.User | null;
type ContextState = {user: User};
interface Props {
  children: ReactNode;
}

const FirebaseAuthContext = createContext<ContextState | undefined>(undefined);

const FirebaseAuthProvider = ({children}: Props) => {
  const [user, setUser] = useState<User>(null);
  const value = {user};

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

function useFirebaseAuth() {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      'useFirebaseAuth must be used within a FirebaseAuthProvider',
    );
  }
  return context.user;
}

export {FirebaseAuthProvider, useFirebaseAuth};
