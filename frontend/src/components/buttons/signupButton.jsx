import { useNavigate } from "react-router-dom"

export function SignupButton(){
    const navigate = useNavigate();
    
    return(
        <button className="bg-blue-500 font-semibold text-xl text-white py-4 px-8 rounded-4xl hover:bg-blue-600 cursor-pointer transition-all duration-200" onClick={() => { navigate("/signup") }}>
            Try For Free
        </button>

    )

}