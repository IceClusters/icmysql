const axios = require('axios');
const { ParseError } = require('../errors/Parser.js')

module.exports = {
	SendDiscordLog: async function (content) {
		if (!Config.DiscordLogs) return;
		if (Config.DiscordWebhook === "") return ParseError(`You have enabled the discord logs but you have not set the webhook, please set the webhook in the config.js file`);
		try {
			await axios.post(Config.DiscordWebhook, content);
		} catch (error) {
			ParseError(`Error sending message to discord webhook`, [err.message]);
		}
	}
}