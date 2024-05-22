import net from "net";
import { handleRequest } from "../src/server";

// In order to run the tests make sure you don't have the server running
// Also double check if your data.json is equal to an empty object.

describe("Server Command Tests", () => {
  let server;

  beforeEach(() => {
    server = net.createServer((socket) => {
      socket.on("data", (data) => {
        const request = data.toString();
        const response = handleRequest(request);
        socket.write(response + "\n");
      });
    });

    server.listen(6379, "localhost");
  });

  afterEach(() => {
    server.close();
  });

  test("SET command sets key-value pair in the server", (done) => {
    const client = net.createConnection(6379, "localhost", () => {
      client.write("SET key value\n");
    });

    client.on("data", (data) => {
      const response = data.toString().trim();
      expect(response).toEqual("OK");
      client.end();
      done();
    });
  });

  test("SET command sets expireKey-value pair in the server", (done) => {
    const client = net.createConnection(6379, "localhost", () => {
      client.write("SET expireKey value\n");
    });

    client.on("data", (data) => {
      const response = data.toString().trim();
      expect(response).toEqual("OK");
      client.end();
      done();
    });
  });

  test("GET command retrieves value for a key from the server", (done) => {
    const client = net.createConnection(6379, "localhost", () => {
      client.write("GET key\n");
    });

    client.on("data", (data) => {
      const response = data.toString().trim();
      expect(response).toEqual("value");
      client.end();
      done();
    });
  });

  test("DEL command deletes value in the server", (done) => {
    const client = net.createConnection(6379, "localhost", () => {
      client.write("DEL key\n");
    });

    client.on("data", (data) => {
      const response = data.toString().trim();
      expect(response).toEqual("OK");
      client.end();
      done();
    });
  });

  test("EXPIRE command set an expiration in the server for the key: expireKey", (done) => {
    const client = net.createConnection(6379, "localhost", () => {
      client.write("EXPIRE expireKey 10\n");
    });

    client.on("data", (data) => {
      const response = data.toString().trim();
      expect(response).toEqual("OK");
      client.end();
      done();
    });
  });

  test("TTL command checks for the expiration key: expireKey in the server", (done) => {
    const client = net.createConnection(6379, "localhost", () => {
      client.write("TTL expireKey\n");
    });

    client.on("data", (data) => {
      const response = parseInt(data.toString().trim(), 10);
      expect(response).toBeGreaterThanOrEqual(0);
      client.end();
      done();
    });
  });
});
