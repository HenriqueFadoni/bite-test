import store from "./store";

export function handleCommand(command) {
  const [cmd, key, value] = command.trim().split(" ");

  switch (cmd.toUpperCase()) {
    case "SET":
      if (!key || !value) {
        return "ERROR: SET command requires a key and a value";
      }

      store.set(key, value);
      return "OK";
    case "GET":
      if (!key) {
        return "ERROR: GET command requires a key";
      }

      return store.get(key) || "NULL";
    case "DEL":
      if (!key) {
        return "ERROR: DEL command requires a key";
      }

      store.del(key);
      return "OK";
    case "EXPIRE":
      if (!key || isNaN(parseInt(value, 10))) {
        return "ERROR: EXPIRE command requires a key and a valid expiration time";
      }

      store.expire(key, parseInt(value, 10));
      return "OK";
    case "TTL":
      if (!key) {
        return "ERROR: TTL command requires a key";
      }

      return store.ttl(key).toString();
    default:
      return "ERROR: Unsupported command";
  }
}
