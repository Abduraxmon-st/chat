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
    }) 
    setFormValue('');// Yozish maydonini tozalaymiz
    };
     
    const messagesEndRef = useRef(null)
    
    const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);


  return (
    <>
      <main>
        <span className='main-span'>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
          <div ref={messagesEndRef} />
        </span>
      </main>
      <form onSubmit={sendMessage}>
        <input 
          value={formValue} 
          onChange={(e) => setFormValue(e.target.value)} 
          placeholder="Xabar yozing..." 
        />
        <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24"><path fill="currentColor" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z" /></svg>
        </button>
      </form>
    </>
  );
}

export default ChatRoom;