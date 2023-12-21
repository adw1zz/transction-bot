require("dotenv").config();
const bot = require('./bot/bot');
const router = require('./router/commands-router');

const root = () => {
    router(bot);
}

root();
