import { Server } from 'socket.io';
import { Env } from '../env.js';
import { socketMiddleware } from '../middlewares/socket.middleware.js';

let io = undefined;

const options = {
    cors: {
        origin: [Env.CLIENT_URL],
        credentials: true,
    },
};

const userSocketMap = new Map();

const registerUserSocket = (socket) => {
    const sockets = userSocketMap.get(socket['userId']) ?? new Set();
    sockets.add(socket.id);
    userSocketMap.set(socket['userId'], sockets);
};

const unregisterUserSocket = (socket) => {
    const sockets = userSocketMap.get(socket['userId']);
    if (sockets) {
        sockets.delete(socket.id);
        if (sockets.size === 0) {
            userSocketMap.delete(socket['userId']);
        }
    }
};

const SocketInstance = (server) => {
    io = new Server(server, options);
    io.use(socketMiddleware);
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket['user'].fullName}`);
        registerUserSocket(socket);

        io.emit('user-connected', Array.from(userSocketMap.keys()));

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket['user'].fullName}`);
            unregisterUserSocket(socket);
            io.emit('user-connected', Array.from(userSocketMap.keys()));
        });
    });
};

const EmitMessageToUser = (receiverId, topic, data) => {
    const sockets = userSocketMap.get(receiverId);
    if (sockets) {
        sockets.forEach((socketId) => {
            io.to(socketId).emit(topic, data);
        });
    }
};

export { SocketInstance, EmitMessageToUser }