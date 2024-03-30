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
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

type User = FirebaseAuthTypes.User | null;
type FirestoreUser = FirebaseFirestoreTypes.DocumentData | null | undefined;
type IsLoading = boolean | null;
type ContextState = {user: User, firestoreUser: FirestoreUser, isLoading: IsLoading};
interface Props {
  children: ReactNode;
}

const FirebaseAuthContext = createContext<ContextState | undefined>(undefined);

const FirebaseAuthProvider = ({children}: Props) => {
  const [user, setUser] = useState<User>(null);
  const [firestoreUser, setFirestoreUser] = useState<FirestoreUser>(null)
  const [isLoading, setIsLoading] = useState<IsLoading>(null)
  const value = {user, firestoreUser, isLoading: isLoading};

  function onAuthStateChanged(user: User) {
    setIsLoading(true)
    setUser(user)
    if(user) {
      const subscriber = firestore()
        .collection('Users')
        .doc(user.uid)
        .onSnapshot(documentSnapshot => {
          const data = documentSnapshot.data();
          setFirestoreUser(data)
        });
      setIsLoading(false)
      return () => subscriber();
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
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
  const user = context.user;
  const firestoreUser = context.firestoreUser;
  return {user, firestoreUser, isLoading: context.isLoading}
}

export {FirebaseAuthProvider, useFirebaseAuth};
