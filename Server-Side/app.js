require('dotenv').config();
const express = require('express');
require('./config/config');
const cors = require('cors');
const app = express();

const http = require('http');
const { Server } = require('socket.io');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/students', require('./routes/student'));
app.use('/api/teachers', require('./routes/teacher'));



app.get('/', (req, res) => {
    res.json({ message: 'CMS API Server is running!' });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});


const PORT = process.env.PORT || 5000;


const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "https://smart-campus-new-1.onrender.com",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {

    socket.on('join', (userRole) => {
        socket.join(userRole);

    });
    socket.on('send_message', (data) => {
        io.emit('receive_message', data);
    });

    socket.on('disconnect', () => {

    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
