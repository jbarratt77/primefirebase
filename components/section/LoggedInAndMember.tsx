import React, { useEffect, useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../Profile';
import {View, Text} from 'react-native';
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

type LodgeData = FirebaseFirestoreTypes.DocumentData | null | undefined;

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
  const [lodgeData, setLodgeData] = useState<LodgeData>(null)
  useEffect(() => {
    firestore()
      .collection('Lodges')
      .doc('2808')
      .onSnapshot(documentSnapshot => {
        const data = documentSnapshot.data();
        setLodgeData(data)
      });
  }, [])
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Meetings" component={Meetings} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default LoggedInAndMember;
