import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyC14V46Mg3h7VUlmsA0lvIeU-iobqbujQ4",
    authDomain: "realtimeparkingapp.firebaseapp.com",
    databaseURL: "https://realtimeparkingapp.firebaseio.com",
    projectId: "realtimeparkingapp",
    storageBucket: "",
    messagingSenderId: "135553681649",
    appId: "1:135553681649:web:ed504dbf1857ed2a908150"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.database()
export const auth = firebase.auth()