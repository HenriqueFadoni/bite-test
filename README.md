# Bite Back-end Test

## Description

This is a simplified version of a Redis-like in-memory key-value store. It supports basic commands such as SET, GET, DEL, EXPIRE, and TTL, and it persists data to a file.

## Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the server
   ```bash
   npm start
   ```

## Usage

You can interact with the server using any TCP client (Example: `nc localhost 6379`).

### Supported Commands

- `SET key value`
- `GET key`
- `DEL key`
- `EXPIRE key seconds`
- `TTL key`

### Example

```bash
telnet localhost 6379
SET foo bar
GET foo
DEL foo
EXPIRE foo 10
TTL foo
```

## BONUS - TESTING (TDD JEST)

Make sure you are not running the application and that the data.json file is an empty object. Then run:

```bash
npm run test
```
