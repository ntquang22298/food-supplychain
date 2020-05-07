import firebase from 'firebase';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyDD6O31rpCVQ-RGe_xPMbOAqdv3eefUpMc',
  authDomain: 'uetchain.firebaseapp.com',
  databaseURL: 'https://uetchain.firebaseio.com',
  projectId: 'uetchain',
  storageBucket: 'uetchain.appspot.com',
  messagingSenderId: '533534382851',
  appId: '1:533534382851:web:2dbc8f95ad1c8f5446a736',
  measurementId: 'G-6C8F55J78C'
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
