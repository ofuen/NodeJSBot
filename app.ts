import * as dotenv from "dotenv";
dotenv.config();

import { ChatConnector, MemoryBotStorage, UniversalBot } from "botbuilder";
import * as restify from "restify";

// Construct connector
const connector = new ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata
});

const bot = new UniversalBot(connector, (session, _args) => {
    // Default dialog handler
});

bot.set('storage', new MemoryBotStorage());

const server = restify.createServer();
server.post('/api/messages', connector.listen());
server.listen(process.env.PORT || 3978, () => console.log(`${server.name} listening to ${server.url}`));

const text = session.message.text!
// Count the text length and send it back
session.endDialog(`You sent '${text}' which was ${text.length} characters`);