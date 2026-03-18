#!/bin/bash

echo "Starting MediLink Platform..."

# Function to handle cleanup on exit
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Trap SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

echo "Installing and starting Backend..."
cd backend
npm install
npm run dev &
BACKEND_PID=$!
cd ..

echo "Installing and starting Frontend..."
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "======================================================="
echo "Both servers are running!"
echo "Backend is running on http://localhost:5001"
echo "Frontend is running on http://localhost:5173"
echo "Press Ctrl+C to stop both servers."
echo "======================================================="
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
