const WebSocket = require('ws');

class WSService {
    users;
    ws;
    bott;

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
            this.users.forEach((user) => {
                const index = user.addr.find(addr => addr === data.inputs[0].addr);
                if (index) {
                    this.bot.send()
                }
            })
        })
    }

    async listenAddresses(addresses, userID) {
        const user = this.users.find(user => user.id === userID);
        if (!user) {
            this.users.push({
                id: userID,
                addr: [...addresses]
            })
        } else {
            const index = this.users.findIndex(user => user.id === userID);
            this.users[index].addresses = this.users[index].addresses.concat(addresses);
        }

        addresses.forEach(addr => {
            this.ws.send(JSON.stringify({
                op: "addr_sub",
                addr: addr
            }))
        });
    }

}

module.exports = new WSService();