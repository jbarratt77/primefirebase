import React from 'react';
import { StyleSheet, View } from 'react-native';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import { Form, FormLabel, Page } from '../../components';

function LoggedOut(): React.JSX.Element {
  return (
    <Page>
      <View style={styles.container}>
        <Form>
          <FormLabel>Logged Out</FormLabel>
          <FormLabel>Please Log In</FormLabel>
        </Form>
        <GoogleSignInButton />
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

export default LoggedOut;
