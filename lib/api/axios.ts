import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://vigorously-lucky-pheasant.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    'accept-language': 'en-US,en;q=0.9',
  },
  withCredentials: true,
});

export default api;
