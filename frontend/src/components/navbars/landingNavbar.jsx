import { useNavigate } from "react-router-dom"
import SahaLogo from "../../assets/sahay-logo-light.png";
import { SignupButton } from "../buttons/signupButton";

export function LandingNavbar() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-row fixed top-0 left-0 right-0 h-20 bg-white justify-between items-center z-50">
            <div className="flex items-center">
                <div
                    className="px-20 hover:cursor-pointer"
                    onClick={() => { navigate("/") }}>
                        <img src={SahaLogo} alt="Logo" className="h-16 w-auto" />
                </div>

                <div
                    className="p-4 font-semibold text-xl text-gray-800 hover:cursor-pointer underline-offset-2 hover:underline transition-all duration-200">
                    For You
                </div>
                <div
                    className="p-4 font-semibold text-xl text-gray-800 hover:cursor-pointer underline-offset-2 hover:underline transition-all duration-200">
                    Resources
                </div>
                <div
                    className="p-4 font-semibold text-xl text-gray-800 hover:cursor-pointer underline-offset-2 hover:underline transition-all duration-200">
                    About
                </div>
            </div>
            <div className="flex items-center">
                <div
                    className="font-semibold p-6 text-xl text-gray-800 hover:cursor-pointer underline-offset-2 hover:underline transition-all duration-200"
                    onClick={() => { navigate("/signin") }}>
                    Log In
                </div>
                <div
                    className="p-6 font-semibold text-xl text-gray-800 hover:cursor-pointer underline-offset-2 hover:underline transition-all duration-200">
                    Help
                </div>
                <div className="p-6">
                    <SignupButton/>
                </div>
            </div>
        </div>
    )
}
