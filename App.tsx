import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFirebaseAuth} from './context/FirebaseAuthContext';
import LoggedInAndMember from './components/section/LoggedInAndMember';
import LoggedInNotMember from './components/section/LoggedInNotMember';
import LoggedOut from './components/section/LoggedOut';
import SplashScreen from './components/section/SplashScreen';

GoogleSignin.configure({
  webClientId:
    '1051714563641-admse8p2sl1n0js0oc51h5lr7vg88aan.apps.googleusercontent.com',
});

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const {user, firestoreUser, isLoading} = useFirebaseAuth();
  console.log(user);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user && firestoreUser ? (
          <>
            <Stack.Screen
              name="Logged in and member"
              component={LoggedInAndMember}
              options={{headerShown: false}}
            />
          </>
        ) : user && !firestoreUser ? (
          <>
            <Stack.Screen
              name="Logged in not member"
              component={LoggedInNotMember}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Logged out" component={LoggedOut} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
