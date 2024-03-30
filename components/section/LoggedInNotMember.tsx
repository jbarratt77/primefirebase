import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Form, FormLabel, Page } from '../../components';
import ButtonContainer from '../ButtonContainer';
import LogoutButton from '../LogoutButton';

function LoggedInNotMember(): React.JSX.Element {
  return (
    <Page>
      <View style={styles.container}>
        <Form>
          <FormLabel>Logged In</FormLabel>
          <FormLabel>Not a member</FormLabel>
        </Form>
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

export default LoggedInNotMember;
