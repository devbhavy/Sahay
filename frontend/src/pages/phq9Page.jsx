import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Phq9Page() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token == null) {
      navigate("/signin");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    let data = [];
    for (let i = 1; i <= 9; i++) {
      const value = e.target[`Q${i}`].value;
      data.push(Number(value));
    }
    const response = await axios.post(
      "http://localhost:3000/app/api/phq9/new",
      { answers: data },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setResult(response.data);
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  }

  const questions = [
    "How often did you feel little interest or pleasure in things?",
    "How often did you feel down, depressed, or hopeless?",
    "Did you have trouble falling asleep, staying asleep, or sleeping too much?",
    "Did you feel tired or have little energy?",
    "How was your appetite or eating—poor or overeating?",
    "Did you feel bad about yourself, like you let yourself or your family down?",
    "Did you find it hard to concentrate, like reading or watching TV?",
    "Did you move or speak noticeably slower, or feel unusually restless?",
    "Did you have thoughts you’d be better off gone or hurt yourself?",
  ];

  const options = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" },
  ];

  return (
    <div className="max-w-xl mx-auto mt-12 mb-20 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
        How Have You Been Feeling Lately?
      </h2>
      <p className="mb-6 text-gray-600 text-center">
        Take a quick self-check. These questions ask about your mood and energy over the past two weeks.
      </p>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-6">
        {questions.map((question, idx) => (
          <div key={idx} className="mb-1">
            <div className="font-medium text-gray-900 mb-2">{idx + 1}. {question}</div>
            <div className="flex flex-wrap gap-4">
              {options.map(opt => (
                <label key={opt.value} className="flex items-center gap-1 text-gray-700">
                  <input
                    type="radio"
                    name={`Q${idx + 1}`}
                    value={opt.value}
                    required={opt.value === 0}
                    className="accent-indigo-600"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 mt-4 rounded bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
        >
          See My Results
        </button>
        {result && (
          <div className="mt-8 bg-indigo-50 border rounded-lg p-5 text-center">
            <div className="mb-2 text-xl font-bold">
              Your PHQ-9 Score: <span>{result.score}</span>
            </div>
            <div className="text-indigo-700">
              {result.suggestion}
            </div>
          </div>
        )}
      </form>
      <div className="mt-8 text-sm text-gray-500 text-center">
        Your answers are private. If you're concerned about your mood or wellbeing, consider reaching out to someone you trust or a mental health professional.
      </div>
    </div>
  );
}
    