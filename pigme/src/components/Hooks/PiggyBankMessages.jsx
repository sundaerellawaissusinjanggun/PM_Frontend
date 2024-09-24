import { useState, useEffect } from 'react';
import Coin from '/coin.svg';

export default function PiggyBankMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('api/messages/{messageId}');
        const data = await response.json();
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);
  return (
    <div>
      {messages.map((message, index) => (
        <div
          key={message.id}
          style={{
            position: 'absolute',
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
          }}
        >
          <p>{message.message}</p>
          <img src={Coin} />
        </div>
      ))}
    </div>
  );
}
