import {Client, GatewayIntentBits} from 'discord.js';
import handleInteractionCreate from './handlers/interactionCreate.js';

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

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand() === false) {
        return;
    }

    console.log(`[INFO] Slash command "/${interaction.commandName}" received from "${interaction.member.user.username}"`);

    handleInteractionCreate(interaction);
});

client.login(process.env.DISCORD_TOKEN);
