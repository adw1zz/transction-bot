const WebSocket = require('ws');
const fs = require('fs');

class WSService {
    users;
    ws;
    bot;

    constructor(bot) {
        this.users = [];
        this.bot = bot;
        this.ws = new WebSocket("wss://ws.blockchain.info/inv");
        this.ws.on('open', () => {
            console.log('connected');
        })
        this.ws.on('error', (e) => {
            console.log(e);
        })
        this.ws.on('message', (msg) => {
            const data = JSON.parse(msg);
            console.log(data.x.hash);
            this.users.forEach((user) => {
                const index = user.addresses.find(addr => addr === data.x.inputs[0].addr);
                if (index) {
                    this.bot.send(msg.chat.id, data)
                }
            })
        })
    }

    async listenAddresses(addresses, userID, bot) {
        const user = this.users.find(user => user.id === userID);
        if (!user) {
            this.users.push({
                id: userID,
                addresses: [...addresses]
            })
            addresses.forEach(addr => {
                this.ws.send(JSON.stringify({
                    op: "unconfirmed_sub",
                    //addr: addr
                }))
            });
        } else {
            const index = this.users.findIndex(user => user.id === userID);
            this.users[index].addresses = this.users[index].addresses.concat(addresses);
            addresses.forEach(addr => {
                this.ws.send(JSON.stringify({
                    op: "unconfirmed_sub",
                    //addr: addr
                }))
            });
        }
    }

}

module.exports = WSService;