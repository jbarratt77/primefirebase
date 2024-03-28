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
type ContextState = {user: User, firestoreUser: FirestoreUser};
interface Props {
  children: ReactNode;
}

const FirebaseAuthContext = createContext<ContextState | undefined>(undefined);

const FirebaseAuthProvider = ({children}: Props) => {
  const [user, setUser] = useState<User>(null);
  const [firestoreUser, setFirestoreUser] = useState<FirestoreUser>(null)
  const value = {user, firestoreUser};

  function onAuthStateChanged(user: User) {
    console.log('here', user)
    setUser(user)
    if(user) {
      const subscriber = firestore()
        .collection('Users')
        .doc(user.uid)
        .onSnapshot(documentSnapshot => {
          const data = documentSnapshot.data();
          console.log('Firestore User Data: ', data);
          setFirestoreUser(data)
        });
      return () => subscriber();
    }
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
  return {user, firestoreUser}
}

export {FirebaseAuthProvider, useFirebaseAuth};
