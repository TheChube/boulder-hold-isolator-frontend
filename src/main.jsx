from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or add your Vercel frontend domain here
    allow_methods=["*"],
    allow_headers=["*"],
)
