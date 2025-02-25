const WebSocket = require("ws");

let wss;

function webSocket(server) {
    wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        console.log("Client terhubung ke WebSocket");

        ws.on("close", () => {
            console.log("Client terputus dari WebSocket");
        });
    });
}

function broadcast(message) {
    if (!wss) return;
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

module.exports = { webSocket, broadcast };
