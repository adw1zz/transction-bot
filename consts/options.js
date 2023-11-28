module.exports = {
    menuOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Add addresses 🚀', callback_data: '/add_addresses' }],
            ]
        })
    },

    commandOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Return to menu ❌', callback_data: '/menu' }]
            ]
        })
    }

}