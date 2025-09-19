
import { LandingNavbar } from "../components/navbars/landingNavbar";
import exampleImage from "../assets/pexels-bri-schneiter-28802-346529.jpg";
import { SignupButton } from "../components/buttons/signupButton";

export function LandingPage(){

    return(
        <div className="flex flex-col mt-20 min-h-screen overflow-x-hidden">
            <LandingNavbar/>
            <div className="relative w-full flex flex-col items-center">
                <div className="relative h-[450px] w-full overflow-hidden">
                    <img
                        className="h-full w-full object-cover object-top"
                        src={exampleImage}
                        alt="failed to load image"
                    />
                    {/* Fading gradient overlay at the bottom */}
                    <div className="absolute left-0 bottom-0 w-full h-32 pointer-events-none bg-gradient-to-t from-white to-transparent" />
                </div>
                <div className="flex flex-col items-center justify-center mt-4 w-full max-w-4xl">
                    <div className="text-center text-blue-950 text-5xl font-bold mb-4 p-4">Calm your mind. Change your life.</div>
                    <div className="text-center text-lg">
                        Mental health is hard. Getting support doesn't need to be. Our app puts the tools to feel better in your back pocket, with personalized content to manage stress and anxiety, get better sleep, and feel more present in your life. Relax your mind, and wake up as the person you want to be.
                    </div>
                    <div className="mt-5 p-4">
                        <SignupButton/>
                    </div>
                </div>
            </div>
        </div>
    )
}
