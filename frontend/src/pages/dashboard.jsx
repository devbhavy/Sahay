import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ChatSection } from "../components/chat/chatDialog";
import axios from "axios";
import { DefaultNavbar } from "../components/navbars/defaultNavbar";

export function Dashboard() {
    const navigate = useNavigate()

    useEffect(() => {
        const check = localStorage.getItem("token");
        if (check == null) {
            navigate("/signin")

        }  
    }, []); 

    return (
        <div>
            <MyComponent/>
        </div>
    );
}

function MyComponent() {
    const token = localStorage.getItem("token");
    const [query,setQuery] = useState("");

    async function handleSubmit(e){
        await axios.post("http://localhost:3000/app/chat/new",{query},{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })

    }

    return (
        <div className=" mt-20">
            <DefaultNavbar/>
            <div className="flex flex-col content-center items-center">
                <div>
                    <ChatSection/>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center my-9 gap-4">
                        <input type="text" placeholder="What's on your mind" className="
                    border rounded-2xl p-4 w-lg" value={query} required onChange={(e)=>{
                            setQuery(e.target.value)
                        }}></input>
                        <button type="submit" className="duration-300 text-white bg-black py-4 px-15 rounded-4xl hover:bg-green-600 cursor-pointer hover:text-white ">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
