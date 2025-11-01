import React, { useState, useEffect } from 'react';

const Joga = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    return () => clearTimeout(typingTimeout);
  }, [newMessage]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>{msg.text}</li>
        ))}
      </ul>

      <input
        type="text"
        value={newMessage}
        onChange={(e) => {
          setNewMessage(e.target.value);
          setIsTyping(true);
        }}
        placeholder="Type a message"
      />

      <button onClick={handleSendMessage}>Send</button>

      {isTyping && <p>User is typing...</p>}
    </div>
  );
};

export default Joga;
