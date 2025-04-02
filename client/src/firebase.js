import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider ,sendSignInLinkToEmail } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyD3wHfH8AnyCGnwaeHoAMf5F43zAKwQZRE",
    authDomain: "zappycart-9ed24.firebaseapp.com",
    projectId: "zappycart-9ed24",
    storageBucket: "zappycart-9ed24.firebasestorage.app",
    messagingSenderId: "538879576479",
    appId: "1:538879576479:web:80823ce7196d05216655aa"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // export

   const auth = getAuth(app);

   const googleAuthProvider = new GoogleAuthProvider();

   export {auth , googleAuthProvider ,sendSignInLinkToEmail}