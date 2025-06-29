import React from 'react';
import { auth } from '../firebase';

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>
      Logout
    </button>
  );
}

export default SignOut