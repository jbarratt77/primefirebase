import React from 'react';
import Button from './Button';
import auth from '@react-native-firebase/auth';
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import analytics from '@react-native-firebase/analytics';

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

function GoogleSignInButton() {
  return (
    <GoogleSigninButton
      onPress={() =>
        onGoogleButtonPress().then(() => {
          analytics().logEvent('login', {});
          console.log('Signed in with Google!')
        })
      }
    />
  );
}

export default GoogleSignInButton;
