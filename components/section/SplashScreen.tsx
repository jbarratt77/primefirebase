import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Form, FormLabel, Page } from '../../components';

function SplashScreen(): React.JSX.Element {
  return (
    <Page>
      <View style={styles.container}>
        <Form>
          <FormLabel>Loading...</FormLabel>
        </Form>
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

export default SplashScreen;
