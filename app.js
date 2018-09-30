"use strict";
exports.__esModule = true;
var botbuilder_1 = require("botbuilder");
var restify = require("restify");
// Construct connector
var connector = new botbuilder_1.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata
});
var bot = new botbuilder_1.UniversalBot(connector, function (session, _args) {
    // Default dialog handler
});
bot.set('storage', new botbuilder_1.MemoryBotStorage());
var server = restify.createServer();
server.post('/api/messages', connector.listen());
server.listen(process.env.PORT || 3978, function () { return console.log(server.name + " listening to " + server.url); });
var text = session.message.text;
// Count the text length and send it back
session.endDialog("You sent '" + text + "' which was " + text.length + " characters");
