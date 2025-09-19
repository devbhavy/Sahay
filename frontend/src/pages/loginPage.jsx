import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import SahayLogo from "../assets/sahay-logo-light.png"

export function LoginPage(){
    const navigate = useNavigate()
    useEffect(()=>{
        const check = localStorage.getItem("token");
        if(check!=null){
            navigate("/dashboard")
        }
    },[])
    
    
    return(
        <div>
            <MyComponent/>
            
        </div>
    )
}

function MyComponent(){
    
    const [input,setInput] = useState({
        email : "",
        password : ""
    });

    const navigate = useNavigate()


    async function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        try{
            const response = await axios.post("http://localhost:3000/app/user/signin",input);
            console.log(response.data.token);
            localStorage.setItem("token",response.data.token);
            navigate("/dashboard")

        }catch(err){
            console.log(err.response.data)
            alert(err.response.data.msg);
        }
    }
    
    function handleChange(e){
        const {name,value} = e.target;
        setInput((prev)=>({...prev,[name] : value}))

    }

    return(
        <div>
            <div className="flex justify-between items-center">
                <div className="py-5 px-8">
                    <img src={SahayLogo} alt="failed to load img" className="h-15 hover:cursor-pointer" onClick={()=>{
                        navigate("/")
                    }}/>
                </div>
                <div className="py-5 px-8">
                    Don't have an account? <span className="underline duration-300 underline-offset-2 hover:text-green-400 cursor-pointer" onClick={()=>{
                        navigate("/signup")
                    }}>Sign up</span>
                </div>

            </div>
            <div className="flex flex-col justify-center items-center mt-8">
                <div className="text-3xl pb-10">
                    Sign in to your account
                </div>
                <div>
                    <button className="duration-300 text-black bg-gray-200 py-4 px-40 rounded-4xl
                     hover:bg-green-600 cursor-pointer hover:text-white ">Sign in with Google</button>
                </div>
                <div className="p-6">
                    or
                </div>

                <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email" name="email" value={input.email} className="
                    border rounded-2xl p-4 w-lg m-6 mt-0" onChange={handleChange} required></input>
                    <input type="password" placeholder="Password" name="password" value={input.password} 
                    className="border rounded-2xl p-4 w-lg m-6 mt-0" onChange={handleChange} required></input>
                    <button type="submit" className="duration-300 text-white bg-black py-4 px-40 rounded-4xl hover:bg-green-600 cursor-pointer hover:text-white ">Sign In</button>

                </form>
            </div>

        </div>
    )
}