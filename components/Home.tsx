import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useLodgeData} from '../context/LodgeDataContext';

function snakeToPascal(snakeCaseString:string) {
  // Split the snake case string by underscores
  const words = snakeCaseString.split('_');

  // Capitalize the first letter of each word
  const pascalCaseWords = words.map(
    word => word.charAt(0).toUpperCase() + word.slice(1),
  );

  // Join the words to form the Pascal case string
  const pascalCaseString = pascalCaseWords.join(' ');

  return pascalCaseString;
}

// Define a custom sort order function
function setOfficerPrecedence(a:string, b:string) {
  // Define your custom order
  const sortOrder = [
    'worshipful_master',
    'senior_warden',
    'junior_warden',
    'immediate_past_master',
    'chaplin',
    'treasurer',
    'secretary',
    'director_of_ceremonies',
    'almoner',
    'charity_steward',
    'membership_officer',
    'mentor',
    'senior_deacon',
    'junior_deacon',
    'assistant_director_of_ceremonies',
    'organist',
    'assistant_secretary',
    'inner_guard',
    'steward',
    'tyler'
  ];

  // Get the index of each element in the custom order array
  const indexA = sortOrder.indexOf(a);
  const indexB = sortOrder.indexOf(b);

  // Compare the indices
  if (indexA === -1 && indexB === -1) {
    // If both elements are not found in the custom order array, use default sorting
    return a.localeCompare(b);
  } else if (indexA === -1) {
    // If only A is not found in the custom order array, put A after B
    return 1;
  } else if (indexB === -1) {
    // If only B is not found in the custom order array, put A before B
    return -1;
  } else {
    // If both elements are found in the custom order array, sort them based on their indices
    return indexA - indexB;
  }
}

function Home() {
  const {lodgeData} = useLodgeData();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to {lodgeData?.name}</Text>
      {lodgeData?.officers &&
        Object.keys(lodgeData.officers).sort(setOfficerPrecedence).map(officer => (
          <Text key={officer}>
            {snakeToPascal(officer)}: {lodgeData.officers[officer]}
          </Text>
        ))}
    </View>
  );
}


// Define styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24, // Adjust the font size as per your requirement
    fontWeight: 'bold', // Make the title bold
    marginBottom: 20, // Add some margin at the bottom for separation
  },
});

export default Home;