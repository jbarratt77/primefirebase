import React from 'react';
import { StyleSheet, View } from 'react-native';
import ButtonContainer from './ButtonContainer';
import Form from './Form';
import FormLabel from './FormLabel';
import FormValue from './FormValue';
import Page from './Page';
import { useFirebaseAuth } from '../context/FirebaseAuthContext';
import LogoutButton from './LogoutButton';


function UserName() {
  const { user } = useFirebaseAuth();
  return (
    <>
      <FormLabel>User Display Name</FormLabel>
      <FormValue>{user?.displayName || "unauthenticated"}</FormValue>
    </>
    );
}

function UserEmail() {
  const { user } = useFirebaseAuth();
  return (
    <>
      <FormLabel>User Email</FormLabel>
      <FormValue>{user?.email || "-"}</FormValue>
    </>
    );
}

function UserRole() {
  const { firestoreUser } = useFirebaseAuth();
  return (
    <>
      <FormLabel>User Role</FormLabel>
      <FormValue>{firestoreUser?.role || "-"}</FormValue>
    </>
    );
}

function Lodges() {
  const { firestoreUser } = useFirebaseAuth();
  return (
    <>
      <FormLabel>Lodges</FormLabel>
      {firestoreUser?.lodges.map((lodge: number) => {
        return <FormValue key={lodge}>{lodge || "-"}</FormValue>
      })}
    </>
    );
}

const Details = () => {
  return (
    <Form>
      <FormLabel>Logged In</FormLabel>
      <UserName />
      <UserEmail />
      <UserRole />
      <Lodges />
    </Form>
  );
};

function Profile(): React.JSX.Element {
  return (
    <Page>
      <View style={styles.container}>
        <Details />
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

export default Profile;
