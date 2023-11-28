// const WebSocket = require('ws');

// const ws = new WebSocket("wss://ws.blockchain.info/inv");

// ws.on('open', function open() {
//     ws.send(JSON.stringify({
//         "op": "addr_sub",
//         "addr": "$bitcoin_address"
//     }));
// });

// ws.on('message', function incoming(data) {
//     const dt = JSON.parse(data);
//     console.log(dt.x.out[0]);
// });
require("dotenv").config();
const bot = require('./bot/bot');
const router = require('./router/commands-router');

const root = () => {
    router(bot);
}

root();
