/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { FirebaseAuthProvider } from './context/FirebaseAuthContext';

const WrappedApp = () => {
  return (
    <FirebaseAuthProvider>
      <App />
    </FirebaseAuthProvider>
  )
}

AppRegistry.registerComponent(appName, () => WrappedApp);
