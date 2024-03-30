import React from 'react';
import {Button, View, Text} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const {user, firestoreUser, isLoading} = useFirebaseAuth();
  console.log(user);

  if (isLoading) {
    return <SplashScreen />;
  }

  function Home() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
      </View>
    );
  }

  function Meetings() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Meetings Screen</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user && firestoreUser ? (
          <>
            <Stack.Screen
              name="Logged in and member"
              options={{headerShown: false}}>
              {() => (
                <Tab.Navigator>
                  <Tab.Screen name="St. Erkenwald" component={Home} />
                  <Tab.Screen name="Meetings" component={Meetings} />
                  <Tab.Screen name="Profile" component={LoggedInAndMember} />
                </Tab.Navigator>
              )}
            </Stack.Screen>
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
