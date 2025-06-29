import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

function SignIn() {
  const signInWithGoogle = () => {
    // Bu funksiya bosilganda, Google orqali kirish oynasini ochadi
    signInWithPopup(auth, googleProvider).catch((error) => console.error(error));
  };

  return (
    <div className='sign-inBox'>
      <p>Chatdan foydalanishingiz uchun Aftorizatsiya qilishingiz kerak</p>
      <button className="sign-in" onClick={signInWithGoogle}>
        Google orqali kirish
      </button>
    </div>
  );
}

export default SignIn;