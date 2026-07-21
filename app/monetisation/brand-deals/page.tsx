"use client";

import Link from "next/link";
import { useState } from "react";

export default function BrandDealSimulator() {
  const [messages, setMessages] = useState([
    { sender: "brand", text: "Hey! We love your channel. We'd like to offer you $1,500 for a 60-second integration in your next video." }
  ]);
  const [reply, setReply] = useState("");
  const [negotiating, setNegotiating] = useState(false);

  const handleSend = () => {
    if (!reply) return;
    const newMsgs = [...messages, { sender: "creator", text: reply }];
    setMessages(newMsgs);
    setReply("");
    setNegotiating(true);

    setTimeout(() => {
      // Very simple mock negotiation logic
      let aiResponse = "We can't go higher than $1,800. Take it or leave it.";
      if (reply.toLowerCase().includes("roi") || reply.toLowerCase().includes("conversion") || reply.toLowerCase().includes("cpm")) {
        aiResponse = "That's a fair point about your high conversion rate. We can bump the offer to $3,500 if you guarantee a link in the top line of the description.";
      }
      setMessages([...newMsgs, { sender: "brand", text: aiResponse }]);
      setNegotiating(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-24">
      <div className="flex items-center space-x-4">
        <Link href="/monetisation" className="text-muted-foreground hover:text-foreground">← Back to Monetisation Academy</Link>
      </div>

      <header className="border-b pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Brand Deal Simulator</h1>
        <p className="text-muted-foreground mt-2 text-lg">Practice negotiating with an AI agent trained on real brand PR playbooks.</p>
      </header>

      <div className="bg-card border rounded-2xl p-6 shadow-xl flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'creator' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] p-4 rounded-2xl ${msg.sender === 'creator' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted text-foreground border rounded-bl-sm'}`}>
                <p className="text-[15px] leading-relaxed">{msg.text}</p>
                <span className="text-xs opacity-70 mt-2 block font-medium">
                  {msg.sender === 'creator' ? 'You' : 'NordVPN PR Agent (AI)'}
                </span>
              </div>
            </div>
          ))}
          {negotiating && (
             <div className="flex justify-start">
              <div className="max-w-[75%] p-4 rounded-2xl bg-muted text-foreground border rounded-bl-sm">
                <p className="text-sm font-bold text-muted-foreground animate-pulse">Brand is formulating a response...</p>
              </div>
            </div>
          )}
        </div>

        <div className="relative pt-4 border-t">
          <div className="flex gap-2">
            <textarea 
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your counter-offer... (Hint: mention your CPM or past ROI)"
              className="flex-1 bg-background border rounded-xl p-4 text-[15px] resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button 
              onClick={handleSend}
              disabled={negotiating || !reply}
              className="px-6 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
