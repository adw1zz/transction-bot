const TelegramAPI = require('node-telegram-bot-api');
const bot = new TelegramAPI(process.env.BOT_TOKEN, { polling: true });

bot.setMyCommands([
    {command: '/start', description: 'Start the bot'},
])

module.exports = bot;