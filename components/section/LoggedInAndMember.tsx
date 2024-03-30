import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../Profile';
import {LodgeDataProvider} from '../../context/LodgeDataContext';
import Home from "../Home";
import Meetings from "../Meetings";

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
