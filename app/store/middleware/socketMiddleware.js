// src/redux/middleware/socketMiddleware.js
import { io } from 'socket.io-client';
import { setQuotesList } from '@store/reducer/quoteSlice'; // We will create this action

import { EXPO_SOCKET_URL, EXPO_SOCKET_BOOKING_ROOM, EXPO_SOCKET_SOCKET_EVENT_UPDATE } from '@env';

const SOCKET_URL = EXPO_SOCKET_URL;
const SOCKET_EVENT_JOIN = EXPO_SOCKET_BOOKING_ROOM;
const SOCKET_EVENT_UPDATE = EXPO_SOCKET_SOCKET_EVENT_UPDATE;
// Action Types for Middleware control
const WS_CONNECT = 'socket/connect';
const WS_DISCONNECT = 'socket/disconnect';
const WS_JOIN_ROOM = 'socket/joinRoom';
let socket;

export const socketMiddleware = store => next => action => {
    const { dispatch } = store;

    switch (action.type) {
        case WS_CONNECT:
            if (socket) socket.close();

            socket = io(SOCKET_URL, {
                transports: ['websocket'], // Use websockets preferentially
            });

            socket.on('connect', () => {
                console.log('Socket.IO connected to backend.');
            });

            // 🌟 Listen for the real-time data push from the backend 🌟
            socket.on(SOCKET_EVENT_UPDATE, (payload) => {
                console.log("Real Time update socket :", payload.status, typeof payload.status);
                if(payload.status === 200){
                    dispatch(setQuotesList(payload.data));
                }
            });

            socket.on('disconnect', () => {
                console.log('Socket.IO disconnected.');
            });
            break;

        case WS_DISCONNECT:
            if (socket) socket.close();
            socket = null;
            break;

        case WS_JOIN_ROOM:
            if (socket) {
                const { id, type } = action.payload; // Destructure both ID and type

                console.log(`Socket joined room: ${id} with type: ${type}`);
                // 🌟 Send the object { id, type } to the backend 🌟
                socket.emit(SOCKET_EVENT_JOIN, { id, type });

            }
            break;

        default:
            return next(action);
    }
    return next(action);
};

// Export the action creators for use in components/thunks
export const wsConnect = () => ({ type: WS_CONNECT });
export const wsDisconnect = () => ({ type: WS_DISCONNECT });
export const wsJoinRoom = (payload) => ({
    type: WS_JOIN_ROOM,
    payload: payload
});