import io from 'socket.io-client';

const URL = process.env.REACT_APP_URL_MAIN
export const socket = io(URL, {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ["websocket"],
  agent: false,
  upgrade: false,
  rejectUnauthorized: true,
});
console.log(socket)
