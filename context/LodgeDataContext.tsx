import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from 'react';
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

type FirebaseData = FirebaseFirestoreTypes.DocumentData | null | undefined;
type IsLoading = boolean | null;
type ContextState = {lodgeData: FirebaseData, meetingData: FirebaseData, isLoading: IsLoading};
interface Props {
  children: ReactNode;
}

const LodgeDataContext = createContext<ContextState | undefined>(undefined);

const LodgeDataProvider = ({children}: Props) => {
  const [lodgeData, setLodgeData] = useState<FirebaseData>(null)
  const [meetingData, setMeetingData] = useState<FirebaseData>(null)
  const [isLoading, setIsLoading] = useState<IsLoading>(null)
  const value = {lodgeData, meetingData, isLoading: isLoading};

  useEffect(() => {
    setIsLoading(true)
    firestore()
      .collection('Lodges')
      .doc('2808')
      .onSnapshot(documentSnapshot => {
        const data = documentSnapshot.data();
        console.log("Lodge data: ", lodgeData)
        setLodgeData(data)
      });
    firestore()
      .collection('Lodges/2808/Meetings')
      .onSnapshot(querySnapshot => {
        const meetings: FirebaseData = [];
        querySnapshot.forEach(doc => meetings.push(doc.data()))
        console.log("Meetings: ", meetings)
        setMeetingData(meetings)
      })
    setIsLoading(false)
  }, [])

  return (
    <LodgeDataContext.Provider value={value}>
      {children}
    </LodgeDataContext.Provider>
  );
};

function useLodgeData() {
  const context = useContext(LodgeDataContext);
  if (context === undefined) {
    throw new Error(
      'useLodgeData must be used within a LodgeDataProvider',
    );
  }
  const lodgeData = context.lodgeData;
  const meetingData = context.meetingData;
  return {lodgeData, meetingData, isLoading: context.isLoading}
}

export {LodgeDataProvider, useLodgeData};