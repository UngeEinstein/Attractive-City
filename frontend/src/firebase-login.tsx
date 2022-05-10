import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvpiNzo0KgS_QIa6gJqaCbJnqSTFl7mMo",
  authDomain: "ac-testenv-328009.firebaseapp.com",
  projectId: "ac-testenv-328009",
  storageBucket: "ac-testenv-328009.appspot.com",
  messagingSenderId: "200555392677",
  appId: "1:200555392677:web:bdc47ecef6bd572200a74c",
  measurementId: "G-GXS91X8DH8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
