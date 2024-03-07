import './App.css';
import { useState, useEffect } from "react"
import io, { Socket } from "socket.io-client"
import React from 'react';
import MessageInput from "./messageInput.tsx"
import Message from "./message.tsx"
import Login from "./login.tsx"

function App() {
     const [socket, setSocket] = useState<Socket>();
     const [messages, setMessages] =useState<string[]>([])

     const send = (value: string) => {
          socket?.emit("message", value)
     }
     useEffect(() => {
          const newSocket=io("http://localhost:8001")
          setSocket(newSocket)
     },[setSocket])

     const messageListener = (message: string) => {
          setMessages([...messages, message])
     }
     useEffect(() => {
          socket?.on("message", messageListener)
          return () => { 
               socket?.off("message", messageListener)
          }
     },[messageListener])
     return (
          <>
          { "" }
          <Login user={user} />
          <MessageInput send={send}/>
          <Message messages={messages}/>
          </>
     )
  
}

export default App;
