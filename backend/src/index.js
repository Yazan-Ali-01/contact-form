import express from 'express';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import connectDB from './config/db.js';
import config from './config/index.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { authenticateAdmin } from './middleware/authMiddleware.js';
import errorHandler from './middleware/errorHandler.js';
import NotFoundError from './errors/NotFoundError.js';
import AuthenticationError from './errors/AuthenticationError.js';

const app = express();

const httpServer = http.createServer(app);
export const io = new SocketIO(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

/**
 * Middleware setup
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(morgan('dev'));

/**
 * Session configuration
 */
app.use(session({
  secret: 'thatisdemosecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: 'lax',
  }
}));

// Routes
app.use('/api/contact', contactRoutes);

/**
 * Admin login route
 * @route POST /api/admin/login
 * @desc Authenticate admin user
 */
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (username === 'admin' && password === 'password') {
    req.session.user = { username };
    res.json({ message: "Login successful" });
  } else {
    req.session.user = null;
    throw new AuthenticationError();
  }
});

/**
 * Admin routes with authentication
 */
app.use('/api/admin', authenticateAdmin, adminRoutes);

/**
 * Check admin session route
 * @route GET /api/admin/check-session
 * @desc Check if admin is authenticated
 */
app.get('/api/admin/check-session', (req, res) => {
  if (req.session.user && req.session.user.username === 'admin') {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Error handling for unmatched routes
app.all('*', (req, res, next) => {
  throw new NotFoundError('Resource Not Found');
});

app.use(errorHandler);

// Connect to database and start server
connectDB().then(() => {
  httpServer.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}).catch(error => {
  console.error('Failed to connect to the database:', error);
});
