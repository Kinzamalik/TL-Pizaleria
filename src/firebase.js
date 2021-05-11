import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCTClNEbGqGJPtc0thiHqDZ6URF-JlG50o",
  authDomain: "quiz-app-typescript.firebaseapp.com",
  projectId: "quiz-app-typescript",
  storageBucket: "quiz-app-typescript.appspot.com",
  messagingSenderId: "3686667243",
  appId: "1:3686667243:web:48a56e4d0aad6e9aa1bfae",
  measurementId: "G-SQNTEH0DPH"
};
firebase.initializeApp(firebaseConfig);
export default firebase;