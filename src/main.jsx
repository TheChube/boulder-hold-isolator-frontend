from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import numpy as np
import cv2
from PIL import Image

app = FastAPI()

# ✅ CORS: allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend domain for security
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ HSV color ranges for hold sets
color_ranges = {
    "Pink":  ([145, 50, 120], [175, 255, 255]),
    "Green": ([35, 50, 50], [85, 255, 255]),
    "Blue":  ([90, 50, 50], [130, 255, 255]),
    "Black": ([0, 0, 0], [180, 255, 50]),
    "White": ([0, 0, 200], [180, 60, 255]),
    "Yellow": ([20, 100, 100], [35, 255, 255]),
}

@app.post("/isolate")
async def isolate(file: UploadFile, color: str = Form(...)):
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    image_np = np.array(image)
    hsv = cv2.cvtColor(image_np, cv2.COLOR_RGB2HSV)

    lower, upper = map(np.array, color_ranges[color])
    mask = cv2.inRange(hsv, lower, upper)

    # Convert to grayscale and back to 3-channel RGB
    gray = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)
    gray_3ch = cv2.cvtColor(gray, cv2.COLOR_GRAY2RGB)

    # Apply mask: restore original color in pink areas
    result = gray_3ch.copy()
    result[mask == 255] = image_np[mask == 255]

    # Encode result to PNG and return
    _, buffer = cv2.imencode(".png", cv2.cvtColor(result, cv2.COLOR_RGB2BGR))
    return StreamingResponse(BytesIO(buffer.tobytes()), media_type="image/png")
