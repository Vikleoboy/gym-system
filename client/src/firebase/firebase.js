// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC-1uJMT1uF5qXZZgDi8x0XHmyiGEFvg9Y',
  authDomain: 'gym-login-5044d.firebaseapp.com',
  projectId: 'gym-login-5044d',
  storageBucket: 'gym-login-5044d.appspot.com',
  messagingSenderId: '855178442273',
  appId: '1:855178442273:web:69259e47881aaed1745560',
  measurementId: 'G-5458V09QE4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
