import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import signupImage from "../assets/signup-image.jpg"; // Replace with your actual image
import SahayLogo from "../assets/sahay-logo-light.png"

export function SignupPage() {
  const navigate = useNavigate();
  useEffect(() => {
      const check = localStorage.getItem("token");
      if (check != null) {
          navigate("/dashboard");
      }
  }, [navigate]);

  return (
      <div className="min-h-screen flex">
          {/* Left image (show on md and up) */}
          <div className="hidden md:block w-1/2 relative">
              <img src={signupImage} alt="Signup" className="object-cover absolute inset-0 w-full h-full" />
          </div>
          {/* Right form section */}
          <div className="relative flex flex-1 flex-col bg-white">
              {/* hi there at the top right */}
              <div className="absolute top-0 right-0 left-0 z-10">
                  <div className="flex justify-between items-center">
                      <div className="py-5 px-8">
                          <img src={SahayLogo} alt="failed to load img" className="h-15 hover:cursor-pointer" onClick={()=>{
                              navigate("/")
                          }}/>
                      </div>
                      <div className="py-5 px-8">
                        Already have an account? <span className="underline duration-300  underline-offset-2 hover:text-green-400 cursor-pointer" onClick={()=>{
                          navigate("/signin")
                          }}>Sign in</span>
                      </div>
                  </div>
              </div>
              {/* Centered account creation form */}
              <div className="flex flex-1 items-center justify-center">
                  <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
                      <h2 className="flex justify-center items-center text-3xl pb-10">Create your account</h2>
                      <MyComponent />
                  </div>
              </div>
          </div>
      </div>
  );
}


function MyComponent() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/app/user/signup",input);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        }catch(err){
            alert(err.response?.data?.msg || "Signup failed!");
        }
    }

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                value={input.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <input
                type="email"
                name="email"
                required
                placeholder="Email"
                value={input.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <input
                type="password"
                name="password"
                required
                placeholder="Password"
                value={input.password}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <div className="flex gap-8 my-2 justify-center">
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="role"
                        value="student"
                        checked={input.role === "student"}
                        onChange={handleChange}
                        required
                        className="accent-blue-600"
                    />
                    Student
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="role"
                        value="volunteer"
                        checked={input.role === "volunteer"}
                        onChange={handleChange}
                        className="accent-blue-600"
                    />
                    Volunteer
                </label>
            </div>
            <button
                type="submit"
                className="duration-300 text-white bg-black py-4 px-40 rounded-4xl hover:bg-green-600 cursor-pointer hover:text-white "
            >
                Sign Up
            </button>
        </form>
    );
}
