import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from "axios";
import { DefaultNavbar } from "../components/navbars/defaultNavbar";

export function ProfilePage() {
    const navigate = useNavigate();
    const [moodHistory, setMoodHistory] = useState([]);
    const [aiInsight, setAiInsight] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }

        Promise.all([
            axios.get("http://localhost:3000/app/api/phq9/history", {
                headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get("http://localhost:3000/app/api/phq9/assesment", {
                headers: { Authorization: `Bearer ${token}` }
            })
        ])
        .then(([historyRes, aiRes]) => {
            const data = historyRes.data.history;
            console.log("hi there")
            const formattedHistory = data.map(entry => ({
                date: new Date(entry.createdAt).toISOString().split('T')[0],
                score: entry.score
            }));

            setMoodHistory(formattedHistory);
            console.log("hi there")
            setAiInsight(aiRes.data.AiInsight || "");
            setLoading(false);
        })
        .catch(error => {
            console.error("Failed to fetch mood history or AI insight:", error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading mood history...</div>;
    }

    const latestReport = moodHistory.length > 0 
        ? moodHistory[moodHistory.length - 1]
        : null;

    return (
        <div className="p-4 mt-10">
            <DefaultNavbar/>
            <h2 className="text-xl font-semibold mt-6">Mood Progress Over Time</h2>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={moodHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 27]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-8 bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">AI Insight</h3>
                <p className="whitespace-pre-line">{aiInsight}</p>
            </div>
            
            <div className="mt-6 bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-lg mb-2">Latest Report</h3>
                    {latestReport
                        ? (
                            <div>
                                <div><span className="font-semibold">Date:</span> {latestReport.date}</div>
                                <div><span className="font-semibold">PHQ-9 Score:</span> {latestReport.score}</div>
                            </div>
                        )
                        : <div>No report found yet!</div>
                    }
                </div>
                <div>
                    <button className="duration-300 text-white bg-black py-4 px-40 rounded-4xl hover:bg-green-600 cursor-pointer hover:text-white" onClick={()=>{
                        navigate("/assessment")
                    }}>Take assessment now!!</button>
                </div>
            </div>
        </div>
    );
}
