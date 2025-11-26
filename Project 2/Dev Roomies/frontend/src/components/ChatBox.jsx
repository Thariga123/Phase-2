import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

export default function ChatBox({ roomId, user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    // Connect to socket
    socketRef.current = io(SOCKET_SERVER_URL);

    // Join room
    socketRef.current.emit("joinRoom", roomId);

    // Listen for incoming messages
    socketRef.current.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    const msgObj = { roomId, message: input, sender: user.name };
    socketRef.current.emit("sendMessage", msgObj);
    setInput("");
  };

  return (
    <div className="border p-4 rounded shadow max-w-md mx-auto mt-4">
      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.sender}: </strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
