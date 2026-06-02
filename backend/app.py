from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
model = joblib.load("student_model.pkl")


class StudentData(BaseModel):
    study_hours: float
    attendance: float
    assignments: float


@app.get("/")
def home():
    return {
        "message": "Student Performance Predictor API Running"
    }


@app.post("/predict")
def predict(data: StudentData):
    prediction = model.predict([[
        data.study_hours,
        data.attendance,
        data.assignments
    ]])

    return {
        "predicted_marks": round(float(prediction[0]), 2)
    }