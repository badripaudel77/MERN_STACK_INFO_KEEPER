const express = require('express');
const dotenv = require('dotenv')

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const contactsRoutes = require('./routes/contacts');
const usersRoutes = require('./routes/users');
const connectDB = require('./config/db')

const app = express();

app.use(express.json()) 

//load the config file
dotenv.config({path: './config/config.env' })

//use rotues
app.use("/", indexRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/contacts", contactsRoutes);

//add error for the unsupported routes , if not any of the above routes
app.use((req, res, next) => {
    const error = new HttpError('No route found ', 404)
    throw error //for async we must use it, for sync we can also use throw error;s
});

//express default handler , especial middleware for error handling with four args, place below app.use(routes)
app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error)
    }
    return res.status(error.errorCode || 500).json({msg : error.message || 'Error occured '})
});

const PORT = process.env.PORT || 5000;
const URL = `http://localhost:${PORT}`;

connectDB(); 
app.listen(PORT, () => console.log("Server is listening at PORT : " + URL ));