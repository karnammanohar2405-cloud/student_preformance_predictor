import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

data = pd.read_csv("student.csv")

X = data[["study_hours", "attendance", "assignments"]]
y = data["marks"]

model = LinearRegression()
model.fit(X, y)

joblib.dump(model, "student_model.pkl")

print("Model saved successfully!")