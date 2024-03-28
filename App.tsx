import React from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useFirebaseAuth } from './context/FirebaseAuthContext';
import LoggedIn from './components/section/LoggedIn';
import LoggedOut from './components/section/LoggedOut';

GoogleSignin.configure({
  webClientId: '1051714563641-admse8p2sl1n0js0oc51h5lr7vg88aan.apps.googleusercontent.com',
});

function App(): React.JSX.Element {
  const user = useFirebaseAuth();
  console.log(user)
  return user ? <LoggedIn /> : <LoggedOut />;
}

export default App;
