#!/bin/bash

# Function to handle script termination
cleanup() {
    echo "Stopping servers..."
    kill $(jobs -p)
    exit
}

# Trap SIGINT and SIGTERM
trap cleanup SIGINT SIGTERM

echo "Starting Tools UMKM Local Development Environment..."

# Install dependencies if node_modules doesn't exist in server
if [ ! -d "server/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd server && npm install && cd ..
fi

# Install dependencies if node_modules doesn't exist in root
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Start Backend
echo "Starting Backend Server..."
cd server
npm run dev &
BACKEND_PID=$!
cd ..

# Start Frontend
echo "Starting Frontend Server..."
npm run dev &
FRONTEND_PID=$!

# Start Astro Blog
echo "Starting Astro Blog Server..."
cd blog
npm run dev &
ASTRO_PID=$!
cd ..

echo "All servers are running."
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Blog PID:   $ASTRO_PID"
echo "Press Ctrl+C to stop."

wait
