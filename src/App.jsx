import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import SignIn from './components/SignIn';
import ChatRoom from './components/ChatRoom';
import SignOut from './components/SignOut';

function App() {
  const [user, setUser] = useState(null); // Foydalanuvchi tizimga kirganmi yoki yo'q?

  // Foydalanuvchining kirish holatini doimiy tekshirib turish
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Mening Super Chatim 💬</h1>
        {/* Agar foydalanuvchi kirgan bo'lsa, Chiqish tugmasini ko'rsat */}
        {user && <SignOut />}
      </header>
      <section>
        {/* Agar foydalanuvchi kirgan bo'lsa, chat xonasini, aks holda Kirish oynasini ko'rsat */}
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;