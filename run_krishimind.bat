@echo off
echo ===================================================
echo     Starting KrishiMind AI (Backend + Frontend)
echo ===================================================
echo.

echo [1/2] Starting FastAPI Backend on http://localhost:8000 ...
start "KrishiMind Backend (FastAPI)" cmd /k ".\.venv\Scripts\python.exe -m uvicorn backend.app.main:app --reload --port 8000"

echo [2/2] Starting React Frontend on http://localhost:5173 ...
start "KrishiMind Frontend (Vite)" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers have been launched in separate windows!
echo Open your browser at: http://localhost:5173
echo ===================================================
timeout /t 3 >nul
start http://localhost:5173
