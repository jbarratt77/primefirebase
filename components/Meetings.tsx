import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useLodgeData } from '../context/LodgeDataContext';

const Stack = createNativeStackNavigator();

function MeetingCard({ meeting }) {
  const navigation = useNavigation();

  const navigateToMeetingDetail = () => {
    // Navigate to Meeting Detail page with the specific meeting data
    navigation.navigate('Meeting Detail', { meeting });
  };

  return (
    <TouchableOpacity onPress={navigateToMeetingDetail} style={styles.card}>
      <Text style={styles.name}>{meeting.name}</Text>
      <Text style={styles.date}>{meeting.date.toDate().toLocaleString()}</Text>
    </TouchableOpacity>
  );
}

function Meetings() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Meetings List" component={MeetingsScreen} />
      <Stack.Screen name="Meeting Detail" component={MeetingDetailScreen} />
    </Stack.Navigator>
  );
}

function MeetingsScreen() {
  const { meetingData } = useLodgeData();

  const renderItem = ({ item }) => <MeetingCard meeting={item} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={meetingData}
        renderItem={renderItem}
        // keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

function MeetingDetailScreen({ route }) {
  const { meeting } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{meeting.name}</Text>
      <Text style={styles.date}>{meeting.date.toDate().toLocaleString()}</Text>
      <Text style={styles.sectionTitle}>Agenda:</Text>
      <FlatList
        data={meeting.agenda}
        renderItem={({ item }) => <Text style={styles.agendaItem}>{item}</Text>}
        // keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  agendaItem: {
    fontSize: 14,
    marginLeft: 10,
  },
});

export default Meetings;
