"use client";
import { useEffect, useState } from "react";

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/xiSjIAI
 */
export default function Component() {
  const [messages, setMessages] = useState<string[]>([]);
  const moduleHash = "0a363b2a63aadb76a525208f1973531d3616fbae";
  const ws = new WebSocket("ws://localhost:3000");

  useEffect(() => {
    ws.onopen = () => {
      ws.send(moduleHash);
    };
    ws.onmessage = event => {
      const json = JSON.parse(event.data);
      console.log(json);
      const { message, clock, data} = json;
      const payload = message ?? `Block: ${clock.number} | Transactions: ${data.transactionTraces}`;
      setMessages((prevMessages) => [...prevMessages, payload]);
    };
  }, [])

  return (
    <aside className="bg-black text-white p-6 rounded-lg w-full max-w-lg font-mono">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 text-red-500">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <p className="text-sm">Substreams WebSockets</p>
      </div>
      <div className="mt-4 break-normal">
        <p className="text-red-400">$ message {"<moduleHash>"}</p>
        <p className="text-green-400">$ {moduleHash}</p>
        {messages.map((message, index) => {
          return <p className="text-white" key={index}>{message}</p>
        })}
      </div>
    </aside>
  )
}