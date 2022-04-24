const ws = require('ws');
const http = require("http");
const express = require("express");

if (process.argv.length < 3) {
    console.log("Usage: node app.js <port>");
    process.exit(1);
}

const port = process.argv[2];
const app = express();
const server = http.createServer(app);
const wss = new ws.WebSocket.Server({server});

app.use("/", function (req, res) {
    res.end('Server acik!');
});

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        ws.send(`Sunucuya gelen veri: ${data}`);
    });
});

server.listen(port);
