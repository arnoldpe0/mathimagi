import app from "firebase/app";
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyAivfZg9PSxO_wu0QffM2KWd4JGZqO2vXs",
  authDomain: "mathimagi-a7926.firebaseapp.com",
  databaseURL: "https://mathimagi-a7926.firebaseio.com",
  projectId: "mathimagi-a7926",
  storageBucket: "mathimagi-a7926.appspot.com",
  messagingSenderId: "134547486530",
  appId: "1:134547486530:web:476cf1585b5c832217badb",
  measurementId: "G-MQ0WBGSTX2"
};

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);

    }
    this.db = app.firestore();
  }

  readings = () => this.db.collection('readings');
}
export default Firebase;
