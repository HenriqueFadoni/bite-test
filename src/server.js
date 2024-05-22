import net from "net";
import store from "./store";

const PORT = 6379;

export const handleRequest = (request) => {
  const parts = request.trim().split(" ");
  const command = parts[0].toUpperCase();
  const args = parts.slice(1);

  switch (command) {
    case "SET":
      if (args.length === 2) {
        store.set(args[0], args[1]);
        return "OK";
      }
      return "ERROR: Invalid SET command";
    case "GET":
      if (args.length === 1) {
        const value = store.get(args[0]);
        return value !== null ? value : "NULL";
      }
      return "ERROR: Invalid GET command";
    case "DEL":
      if (args.length === 1) {
        store.del(args[0]);
        return "OK";
      }
      return "ERROR: Invalid DEL command";
    case "EXPIRE":
      if (args.length === 2) {
        const key = args[0];
        const seconds = parseInt(args[1], 10);
        if (!isNaN(seconds)) {
          store.expire(key, seconds);
          return "OK";
        }
      }
      return "ERROR: Invalid EXPIRE command";
    case "TTL":
      if (args.length === 1) {
        const ttl = store.ttl(args[0]);
        return ttl >= 0 ? ttl.toString() : "NULL";
      }
      return "ERROR: Invalid TTL command";
    default:
      return "ERROR: Unknown command";
  }
};

const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on("data", (data) => {
    const request = data.toString();
    const response = handleRequest(request);
    socket.write(response + "\n");
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
