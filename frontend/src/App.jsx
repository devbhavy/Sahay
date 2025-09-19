import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/landingPage";
import { LoginPage } from "./pages/loginPage";
import { Dashboard } from "./pages/dashboard";
import { SignupPage } from "./pages/signupPage";
import { ProfilePage } from "./pages/profile";
import { Phq9Page } from "./pages/phq9Page";
import { LibraryPage } from "./pages/LibraryPage";

function App(){
  return(
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
    
  )
}


function Main(){
  return(
    <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/signin" element={<LoginPage/>}></Route>
      <Route path="/signup" element={<SignupPage/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/profile" element={<ProfilePage/>}></Route>
      <Route path="/assessment" element={<Phq9Page/>}></Route>
      <Route path="/dashboard/library" element={<LibraryPage/>}></Route>
    </Routes>
  )
}


export default App;