# ICAEBMS 2026 Backend

This is the backend for the ICAEBMS 2026 Conference Management System built with Node.js, Express, and MongoDB.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Setup environment variables:**
   Ensure you have a `.env` file in the root of your project matching `.env.example`. Check the `.env` for exact details.
3. **Run the server:**
   ```bash
   npm run dev
   # or
   node server.js
   ```
   The backend will start on `http://localhost:5000` (by default).

## Frontend Integration Guide

This guide will help you connect your React frontend to this backend.

### 1. Setup Axios Config

Create a file in your React frontend (e.g., `src/api/axios.js`) to set up Axios with credentials.

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Update this for production
  withCredentials: true, // This is IMPORTANT for sending/receiving cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the token if needed
// (Tokens are also sent via cookies, but you can add it to the header as well if needed)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 2. User Authentication Example

```javascript
import api from './api/axios';

// Login
const handleLogin = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    console.log('Login successful:', response.data);
    
    // Store token if you prefer localStorage over cookies
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message);
  }
};
```

### 3. File Upload Example (Paper Submission)

```javascript
import api from './api/axios';

const handlePaperSubmit = async (formDataState, file) => {
  try {
    // 1. Create a FormData instance
    const formData = new FormData();
    
    // 2. Append text fields
    formData.append('fullName', formDataState.fullName);
    formData.append('email', formDataState.email);
    formData.append('paperTitle', formDataState.paperTitle);
    formData.append('abstract', formDataState.abstract);
    formData.append('sessionTrack', formDataState.sessionTrack);
    formData.append('institution', formDataState.institution);
    formData.append('country', formDataState.country);
    
    // Convert keywords to a comma-separated string or append multiple times depending on your state structure
    formData.append('keywords', formDataState.keywords.join(','));
    
    // 3. Append the file (MUST match the name expected by multer, which is 'paperFile')
    formData.append('paperFile', file);

    // 4. Send the request
    const response = await api.post('/api/papers/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Paper submitted successfully!', response.data);
  } catch (error) {
    console.error('Paper submission failed:', error.response?.data?.message);
  }
};
```

### 4. Fetching Conference Details

```javascript
import api from './api/axios';

const fetchDetails = async () => {
  try {
    const response = await api.get('/api/conference/details');
    console.log('Conference Details:', response.data);
  } catch (error) {
    console.error('Error fetching details:', error);
  }
};
```
