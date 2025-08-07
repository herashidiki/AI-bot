import { useState } from "react";
import{FaRobot} from"react-icons/fa"

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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", // replace with your real key
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a cool friend." },
          ...newMessages
        ]
      })
    });

    const data = await res.json();

    const reply = data.choices?.[0]?.message?.content || "No reply";
    const luna = reply.replace(/assistant/gi,"luna");
    setMessages([...newMessages, { role: "assistant", content:`luna: ${luna}` }]);
 
let voice =[];

window.speechSynthesis.onvoiceschanged =()=>{
  voice = window.speechSynthesis.getVoices()
}

const speak =(text) =>{
  if(!voice.length){
    voice = window.speechSynthesis.getVoices()
  }
  const utterance = new SpeechSynthesisUtterance(text)
  const cutevoice = voice.find((voice) => voice.name.includes("Google UK English Female") || voice.name.includes("Jenny")  || voice.name.includes("en-US")
);

if(cutevoice) utterance.voice = cutevoice;
utterance.pitch = 1.3;
utterance.rate = 1.1;
utterance.volume = 7;
utterance.lang = "en-US"

speechSynthesis.speak(utterance)

}


speak(luna)














  };

  return (

          
          
          
          
          
  
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-indigo-300 p-4 sm:p-6 flex flex-col items-center justify-center">
  <div className="w-full max-w-2xl bg-purple-200 rounded-2xl shadow-xl p-6 flex flex-col space-y-4">
    
    {/* Header */}
    <div className="h-auto sm:h-40 overflow-y-auto space-y-2 text-center">
      <FaRobot className="h-10 w-10 mx-auto text-indigo-700 shadow-lg rounded-full  animate-bounce" />
      <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-800 to-pink-600 text-transparent bg-clip-text  drop-shadow-md  ">
        Hi, I'm your chat bot 💜
      </h1>
    </div>

    {/* Chat Messages */}
    {messages.map((msg, i) => (
      <div
        key={i}
        className={`p-3 rounded-lg max-w-xs sm:max-w-sm break-words transition-all duration-300 ${
          msg.role ===  "user"
            ? "bg-gradient-to-br from-purple-400 to-indigo-500 text-white self-end text-right shadow-lg "
            : "bg-white border border-indigo-200 self-start text-left shadow-md capitalize  "
        }`}
      >
        <p className="text-xs text-indigo-600 mb-1">{msg.role}:</p>
        <p className="text-gray-800 text-sm   font-serif ">{msg.content}</p>
      </div>
    ))}

    {/* Input + Button */}
    <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 ">
      <input
        className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        className="bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600 hover:scale-110 transform transition-transform duration-300"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  </div>
</div>
  );
};

export default ChatBot;