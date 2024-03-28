import React from 'react';
import { StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import ButtonContainer from '../../components/ButtonContainer';
import Button from '../../components/Button';
import {Form, FormLabel, FormValue, Page} from '../../components';
import { useFirebaseAuth } from '../../context/FirebaseAuthContext';

const LogoutButton = () => {

  const onPress = async () => {
    try {
      await auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    } catch (e) {
      console.log(e);
    }
  };

  return <Button onPress={onPress} text="Log out" color="#EF525B" />;
};


function UserName() {
  const user = useFirebaseAuth();
  return (
    <>
      <FormLabel>User Display Name</FormLabel>
      <FormValue>{user?.displayName || "unauthenticated"}</FormValue>
    </>
    );
}

function UserEmail() {
  const user = useFirebaseAuth();
  return (
    <>
      <FormLabel>User Email</FormLabel>
      <FormValue>{user?.email || "-"}</FormValue>
    </>
    );
}

const Profile = () => {
  return (
    <Form>
      <FormLabel>Logged In</FormLabel>
      <UserName />
      <UserEmail />
    </Form>
  );
};

function LoggedIn(): React.JSX.Element {
  return (
    <Page>
      <View style={styles.container}>
        <Profile />
        <ButtonContainer>
          <LogoutButton />
        </ButtonContainer>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoggedIn;
