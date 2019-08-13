import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCwUlMaCAU6uRe7nvN55o1UcP-jdntCbog",
    authDomain: "todo-test-44eda.firebaseapp.com",
    databaseURL: "https://todo-test-44eda.firebaseio.com",
    projectId: "todo-test-44eda",
    storageBucket: "todo-test-44eda.appspot.com",
    messagingSenderId: "495706918006",
    appId: "1:495706918006:web:ca82d5040ef888f1"
};

const firebaseApp = firebase.initializeApp(config);
export const firestore = firebaseApp.firestore();