@echo off
echo Starting MediLink Platform...

echo Installing and starting Backend...
cd backend
call npm install
start "MediLink Backend" cmd /c "npm run dev"
cd ..

echo Installing and starting Frontend...
cd frontend
call npm install
start "MediLink Frontend" cmd /c "npm run dev"
cd ..

echo =======================================================
echo Both servers started in separate windows!
echo Backend is running on http://localhost:5001
echo Frontend is running on http://localhost:5173
echo Close the newly opened command windows to stop the servers.
echo =======================================================
pause
