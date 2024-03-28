import React from 'react';
import {Text} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import GoogleSignInButton from './components/GoogleSignInButton';
import ButtonContainer from './components/ButtonContainer';

GoogleSignin.configure({
  webClientId: '1051714563641-admse8p2sl1n0js0oc51h5lr7vg88aan.apps.googleusercontent.com',
});

function App(): React.JSX.Element {
  return (
  <>
    <Text>Hello World</Text>
    <ButtonContainer>
      <GoogleSignInButton />
    </ButtonContainer>
  </>);
}

export default App;
