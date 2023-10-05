importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDenf_FIXUibiE6kFr2YdL6tOrINDs6AM4',
  authDomain: 'notifications-firebase-poc.firebaseapp.com',
  databaseURL: 'https://notifications-firebase-poc.firebaseio.com',
  projectId: 'notifications-firebase-poc',
  storageBucket: 'pnotifications-firebase-poc.appspot.com',
  messagingSenderId: '891500820190',
  appId: '1:891500820190:web:b9a4b3f40c593202e2344f',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});