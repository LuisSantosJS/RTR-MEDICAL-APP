/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import { name as appName } from './app.json';
const NotificationHandler = messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => NotificationHandler);
AppRegistry.registerComponent(appName, () => App);


