const { post } = require('axios');
const { ParseError } = require('../errors/Parser.js')
let warned = false;
module.exports = {
	SendDiscordLog: async function (content) {
		if (!Config.DiscordLogs) return;
		if(warned) return;
		if (Config.DiscordWebhook === "") { 
			warned = true;
			return ParseError(`You have enabled the discord logs but you have not set the webhook, please set the webhook in the config.js file`);
		}
		try {
			await post(Config.DiscordWebhook, content);
		} catch (error) {
			ParseError(`Error sending message to discord webhook`, [err.message]);
		}
	}
}