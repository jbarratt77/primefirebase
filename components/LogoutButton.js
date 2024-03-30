import React from 'react';
import auth from '@react-native-firebase/auth';
import Button from './Button';

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

export default LogoutButton;