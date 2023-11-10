from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class PredictPayload(BaseModel):
    wagnum: int = 0
    month: str = ""

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/predict")
def upload(payload: list[PredictPayload]):
    print('Predict')
    try:
        print(payload[0])
    except Exception:
        return {"message": "There was an error on the server"}

    return {"message": "Recieved data"}