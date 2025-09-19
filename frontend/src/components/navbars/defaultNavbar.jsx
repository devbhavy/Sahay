import { useNavigate } from "react-router-dom"
import SahayLogo from "../../assets/sahay-logo-light.png"

export function DefaultNavbar(){
    const navigate = useNavigate();

    function handleSignOut(){
        localStorage.removeItem("token");
        navigate("/signin")
    }   

    return(
        <div className="fixed top-0 left-0 right-0 h-18 flex justify-between items-center bg-gray-200 z-50">
            <div>
                <div className="py-5 px-8">
                    <img src={SahayLogo} alt="failed to load img" className="h-15 hover:cursor-pointer" onClick={()=>{
                        navigate("/");
                        console.log("hi there")
                    }}/>
                </div>
            </div>
            <div className="flex gap-x-6">
                <div className="p-4 font-semibold text-xl text-gray-800 hover:cursor-pointer underline-offset-2 hover:underline transition-all duration-200" onClick={()=>{
                    navigate("/dashboard")
                }}>Home</div>
                <div className="p-4 font-semibold text-xl text-gray-800 hover:cursor-pointer underline-offset-2 hover:underline transition-all duration-200" onClick={()=>{
                    navigate("/dashboard/library")
                }}>Library</div>
                <div className="p-4 font-semibold text-xl text-gray-800 hover:cursor-pointer underline-offset-2 hover:underline transition-all duration-200" onClick={()=>{
                    navigate("/profile")
                }}>Profile</div>
            </div>
            <div className="p-4 font-semibold text-xl text-gray-800 hover:cursor-pointer underline-offset-2 hover:underline transition-all duration-200" onClick={handleSignOut}>
                Sign out
            </div>


        </div>
    )
}