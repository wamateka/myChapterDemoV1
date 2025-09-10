//import expreess and other necessary middlewares
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
// Importing database connection
import {sql} from '../server/db/dbConnection.js';
// Importing routes
import memberRoutes from './routes/memberRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import committeeRoutes from './routes/committeeRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import pointsLogRoutes from './routes/pointsLogRoutes.js';
import authRoutes from './routes/authRoutes.js';
import rsvpRoutes from './routes/rsvpRoutes.js'
import passport from 'passport';
import './passport-config.js';
// Importing environment variables
import dotenv from 'dotenv';
import  session  from 'express-session';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000*60*60*24
  }

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // allow your frontend origin
  credentials: true
}));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
); // helmet is a security middleware that helps you protect your app by setting various HTTP headers

app.use(morgan("dev")); // log the requests
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/rsvp', rsvpRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/committee', committeeRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/pointslogs', pointsLogRoutes);

if(sql){
  app.listen(PORT, () => {
    console.log(`Database connected successfully`);
    console.log(`Server is running on port ${PORT}`);
  });
}

