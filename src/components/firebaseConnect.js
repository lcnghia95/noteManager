import * as firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyCnd5QMzLHnFA5nBsag485C2Kp6KqDW37M",
    authDomain: "notedb-6d92d.firebaseapp.com",
    databaseURL: "https://notedb-6d92d.firebaseio.com",
    projectId: "notedb-6d92d",
    storageBucket: "notedb-6d92d.appspot.com",
    messagingSenderId: "893675642618",
    appId: "1:893675642618:web:81290908467e4e109bb343"
  };
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);
  export const firebaseConnect =  firebase.database().ref('noteData');

 