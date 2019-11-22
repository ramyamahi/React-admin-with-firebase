import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  	apiKey: "AIzaSyA5nLQTrrHT28LWv_WVV1gVl-PW_IZm_gM",
  	authDomain: "session-admin.firebaseapp.com",
  	databaseURL: "https://session-admin.firebaseio.com",
  	projectId: "session-admin",
  	storageBucket: "session-admin.appspot.com",
  	messagingSenderId: "112021430933",
  	appId: "1:112021430933:web:9f0a3e628d9f1023edf19c",
  	measurementId: "G-BE29987E0Z"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;