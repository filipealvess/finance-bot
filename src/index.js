import {Client, GatewayIntentBits} from 'discord.js';
import handleMessageCreate from './handlers/messageCreate.js';

import 'dotenv/config';


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});


client.once('clientReady', () => {
    console.log(`[INFO] Connected bot: "${client.user.tag}"\n`);
});

client.on('messageCreate', message => {
    if (message.author.bot === true) {
        return;
    }

    console.log(`[INFO] Message "${message.content}" received from "${message.author.username}"`);

    handleMessageCreate(message);
});

client.login(process.env.DISCORD_TOKEN);
