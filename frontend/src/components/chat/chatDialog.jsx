import { memo, useEffect, useState } from "react";
import axios from "axios";

const ChatSection = memo(()=>{
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("User is not authenticated");
                return;
            }

            try {
                const response = await axios.get("http://localhost:3000/app/chat/", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if(response.data.messages==null){
                    setMessages([])
                }else{
                    console.log(response.data.messages)
                    setMessages(response.data.messages);    
                }

                

            } catch (err) {
                console.error(err.response?.data || err.message);
                setError("Failed to fetch chat messages");
            }
        }
        
        const interval = setInterval(fetchData, 3000);  // every 3s
        return () => clearInterval(interval);
        

        
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col space-y-4 p-4 max-w-2xl mx-auto overflow-x-auto h-[600px] ">
            {messages.length === 0 ? (
  <div className="flex items-center justify-center h-full text-gray-400">
    No chats yet! Start a conversation.
  </div>
) : (messages.map((data, index) => (
    <div
      key={index}
      className={`p-3 rounded ${
        data.role === "user"
          ? "bg-blue-200 self-end text-right"
          : "bg-gray-200 self-start text-left"
      }`}
    >
      {data.parts[0].text}
    </div>
  ))
)}

        </div>
    );

})


export {ChatSection}

