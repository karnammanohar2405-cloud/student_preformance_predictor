import { useState } from "react";
import "./App.css";

function App() {
  const [studyHours, setStudyHours] = useState("");
  const [attendance, setAttendance] = useState("");
  const [assignments, setAssignments] = useState("");
  const [result, setResult] = useState("");

  const handlePredict = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          study_hours: Number(studyHours),
          attendance: Number(attendance),
          assignments: Number(assignments),
        }),
      });

      const data = await response.json();
      setResult(data.predicted_marks);
    } catch (error) {
      console.error(error);
      alert("Failed to connect to backend");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Student Performance Predictor</h1>

        <input
          type="number"
          placeholder="Study Hours"
          value={studyHours}
          onChange={(e) => setStudyHours(e.target.value)}
        />

        <input
          type="number"
          placeholder="Attendance (%)"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
        />

        <input
          type="number"
          placeholder="Assignments Completed"
          value={assignments}
          onChange={(e) => setAssignments(e.target.value)}
        />

        <button onClick={handlePredict}>
          Predict Marks
        </button>

        {result !== "" && (
          <h2>Predicted Marks: {result}</h2>
        )}
      </div>
    </div>
  );
}

export default App;