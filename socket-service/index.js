const WebSocket = require('ws');
const Redis = require('ioredis');

const redis = new Redis();
const wss = new WebSocket.Server({port:4000});
console.log("websocket running on the port 4000");
wss.on("connection",(ws)=>{
    console.log("client connected");
    const interval = setInterval(async ()=>{
        const bitcoin = await redis.get('bitcoin');
        const ethereum = await redis.get('ethereum');
        ws.send(JSON.stringify({
            bitcoin: Number(bitcoin),
            ethereum: Number(ethereum)
        }));
    },5000);
});