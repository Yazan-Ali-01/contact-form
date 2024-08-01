// This file would typically contain more complex Socket.IO logic or be used for testing
import { io } from './index.js'; // This would be possible if you export io from index.js

const getIo = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};

export { getIo };
