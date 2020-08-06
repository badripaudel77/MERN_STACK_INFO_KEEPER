const express = require('express');
const dotenv = require('dotenv')

const authRoutes = require('./routes/auth');
const contactsRoutes = require('./routes/contacts');
const usersRoutes = require('./routes/users');
const connectDB = require('./config/db')

const app = express();

app.use(express.json()) //dont need bodyParser

//load the config file
dotenv.config({path: './config/config.env' })

//use rotues
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/contacts", contactsRoutes);

const PORT = process.env.PORT || 5000;
const URL = `http://localhost:${PORT}`;

connectDB(); 
app.listen(PORT, () => console.log("Server is listening at PORT : " + URL ));