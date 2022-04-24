const ws = require('ws');
const http = require("http");
const express = require("express");

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

server.listen(process.env.PORT || 8080);

