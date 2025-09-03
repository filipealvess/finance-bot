import {REST, Routes} from 'discord.js';

import 'dotenv/config';

const commands = [
    {
        name: 'despesa',
        description: 'Registra uma despesa',
        options: [
            {
                name: 'valor',
                description: 'O valor gasto (ex: 199.99)',
                type: 10, // ApplicationCommandOptionType.Number
                required: true,
            },
            {
                name: 'categoria',
                description: 'A categoria da despesa',
                type: 3, // ApplicationCommandOptionType.String
                required: true,
            },
        ],
    },
    {
        name: 'receita',
        description: 'Registra uma receita',
        options: [
            {
                name: 'valor',
                description: 'O valor ganho (ex: 499.99)',
                type: 10, // ApplicationCommandOptionType.Number
                required: true,
            },
            {
                name: 'categoria',
                description: 'A categoria da receita',
                type: 3, // ApplicationCommandOptionType.String
                required: true,
            },
        ],
    },
];

const rest = new REST({version: '10'}).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('[CONFIG] Creating slash commands...');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            {body: commands},
        );

        console.log('[CONFIG] Slash commands created!');
    } catch (error) {
        console.error('[ERROR] Failed to create slash commands');
        console.error(error);
    }
})();
