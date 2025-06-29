import React from 'react';
import { auth } from '../firebase';

function ChatMessage(props) {
  const { text, uid, displayName, createdAt } = props.message;

  // Xabarni yuborgan odam o'zimiz bo'lsak, "sent" klassini, bo'lmasa "received" klassini beramiz
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    // Xabarni yuborgan odam o'zimiz bo'lsak, "sentTime" klassini, bo'lmasa "receivedTime" klassini beramiz (Vaqtni togri korsatish uchun)
  const messageTimeClass = uid === auth.currentUser.uid ? 'sentTime' : 'receivedTime';

const timeString = createdAt
    ? new Date(createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className={`message ${messageClass}`}>
      <div className="message-content">
        {/* Agar xabar bizniki bo'lmasa, yuboruvchi ismini ko'rsatamiz */}
        {messageClass === 'received' && <p className="sender-name">{displayName}</p>}
        <p className="text">{text}</p>
      </div> 
      {createdAt && <span className={`message-time ${messageTimeClass}`}>{timeString}</span>}
    </div>
  );
}

export default ChatMessage;