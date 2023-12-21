const MESSAGES = require('../consts/messages');
const { menuOptions, commandOptions } = require('../consts/options');
const inputService = require('../services/input-service');
const bot = require('../bot/bot');
const WSService = require('../services/ws-service');
const wsService = new WSService(bot);

class CallbackContoller {

    async menu(bot, msg) {
        try {
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
            return await bot.sendMessage(msg.message.chat.id, MESSAGES.MENUBAR, menuOptions);
        } catch (e) {
            console.log(e);
            await bot.sendMessage(msg.from.id, MESSAGES.BACK_END_ERROR, commandOptions);
        }
    }

    async addAddresses(bot, msg) {
        try {
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
            await bot.sendMessage(msg.message.chat.id, MESSAGES.ADD_ADDRESSES, commandOptions);
            const service = wsService;
            const handler = async (msg) => {
                if (msg.text[0] !== '/') {
                    const inputData = inputService.parseInputData(msg.text);
                    if (!inputData) {
                        await bot.sendMessage(msg.chat.id, MESSAGES.SYNTAX_ERROR, commandOptions);
                    } else {
                        service.listenAddresses(inputData, msg.chat.id);
                        await bot.sendMessage(msg.chat.id, `${MESSAGES.SUCCESS}Bot listening address`, commandOptions);
                    }
                }
                return bot.removeListener('message', handler);
            }
            return bot.on('message', handler);
        } catch (e) {
            console.log(e);
            await bot.sendMessage(msg.from.id, MESSAGES.BACK_END_ERROR, commandOptions);
        }
    }
}

module.exports = new CallbackContoller();