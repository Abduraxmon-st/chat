import React, { useState, useEffect, useRef } from 'react';
import { firestore, auth } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import ChatMessage from './ChatMessage';

function ChatRoom() {
  const [messages, setMessages] = useState([]); // Barcha xabarlar saqlanadigan joy
  const [formValue, setFormValue] = useState(''); // Xabar yozish maydonidagi matn

  // `useEffect` komponent ilk bor ekranga chiqqanda ishlaydi
  useEffect(() => {
    const messagesRef = collection(firestore, 'messages'); // "messages" kolleksiyasiga murojaat
    const q = query(messagesRef, orderBy('createdAt')); // Xabarlarni yaratilgan vaqti bo'yicha tartiblaymiz

    // `onSnapshot` - bu "jonli" obuna. Bazadagi xabarlar o'zgarsa, shu funksiya darhol ishlaydi
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesData); // Kelgan yangi xabarlarni ekranga joylaymiz
    });

    return unsubscribe; // Komponent ekrandan yo'qolganda obunani bekor qilish
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault(); // Sahifa yangilanib ketishining oldini olish
    if (formValue.trim() === '') return; // Bo'sh xabar yuborishni cheklash

    const { uid, displayName } = auth.currentUser; // Hozirgi foydalanuvchi ma'lumotlari

    // "messages" kolleksiyasiga yangi hujjat (xabar) qo'shamiz
    await addDoc(collection(firestore, 'messages'), {
      text: formValue,
      createdAt: serverTimestamp(), // Serverning aniq vaqtini belgilash
      uid,
      displayName,
    });

    setFormValue(''); // Yozish maydonini tozalaymiz
  };

  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </main>
      <form onSubmit={sendMessage}>
        <input 
          value={formValue} 
          onChange={(e) => setFormValue(e.target.value)} 
          placeholder="Xabar yozing..." 
        />
        <button type="submit">➡️</button>
      </form>
    </>
  );
}

export default ChatRoom;