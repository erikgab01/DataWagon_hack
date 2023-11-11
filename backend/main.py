from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from ml_script import Solution 

class PredictPayload(BaseModel):
    wagnum: int = 0
    month: str = ""

app = FastAPI()

SOLUTION = Solution()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/predict")
def upload(payload: list[PredictPayload]):
    try:
        data = []
        for row in payload:
            data.append(row.model_dump())
        df = pd.DataFrame(data) 
        df.to_csv("data.csv", index=False)
        result = SOLUTION.predict("data.csv")
        return {
            "data": result
        }
    except Exception:
        return {"message": f"There was an error on the server"}