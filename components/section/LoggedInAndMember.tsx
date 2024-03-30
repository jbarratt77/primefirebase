import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../Profile';
import {View, Text} from 'react-native';
import { LodgeDataProvider } from '../../context/LodgeDataContext';

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

const Tab = createBottomTabNavigator();

function LoggedInAndMember(): React.JSX.Element {
  return (
    <LodgeDataProvider>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Meetings" component={Meetings} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </LodgeDataProvider>
  );
}

export default LoggedInAndMember;
