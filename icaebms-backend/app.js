const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security Middlewares
// Set security headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Important for serving static images/pdfs to another domain

// Sanitize data
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100 // 100 requests per 10 mins
});
app.use(limiter);

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:8080',
  credentials: true
}));

// Set static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes placeholders
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/papers', require('./routes/paperRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/conference', require('./routes/conferenceRoutes'));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'ICAEBMS 2026 API is running successfully!' });
});

// Error handling middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

module.exports = app;
