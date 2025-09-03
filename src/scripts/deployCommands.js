import {REST, Routes} from 'discord.js';

import 'dotenv/config';

const incomeOptions = [
    {name: 'Salário', value: 'salario'},
    {name: 'Dividendo', value: 'dividendos'},
    {name: 'Presente', value: 'presente'},
    {name: 'Rendimento', value: 'rendimento'},
    {name: 'Bônus', value: 'bonus'},
];

const expenseOptions = [
    {name: 'Mercado', value: 'mercado'},
    {name: 'Energia', value: 'energia'},
    {name: 'Água/Saneamento', value: 'agua-saneamento'},
    {name: 'Internet', value: 'internet'},
    {name: 'Moradia', value: 'moradia'},
    {name: 'Compra', value: 'compra'},
    {name: 'Restaurante', value: 'restaurante'},
    {name: 'Viagem', value: 'viagem'},
    {name: 'Presente', value: 'presente'},
    {name: 'Imposto', value: 'imposto'},
    {name: 'Cartão de crédito', value: 'cartao-credito'},
];

const years = [
    {name: '2025', value: '2025'},
    {name: '2024', value: '2024'},
    {name: '2023', value: '2023'},
    {name: '2022', value: '2022'},
    {name: '2021', value: '2021'},
];

const months = [
    {name: 'Dezembro', value: '11'},
    {name: 'Novembro', value: '10'},
    {name: 'Outubro', value: '9'},
    {name: 'Setembro', value: '8'},
    {name: 'Agosto', value: '7'},
    {name: 'Julho', value: '6'},
    {name: 'Junho', value: '5'},
    {name: 'Maio', value: '4'},
    {name: 'Abril', value: '3'},
    {name: 'Março', value: '2'},
    {name: 'Fevereiro', value: '1'},
    {name: 'Janeiro', value: '0'},
];

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
                choices: expenseOptions,
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
                choices: incomeOptions,
            },
        ],
    },
    {
        name: 'saldo',
        description: 'Consulta o saldo do mês informado',
        options: [
            {
                name: 'ano',
                description: 'O ano que será consultado',
                type: 3, // ApplicationCommandOptionType.String
                required: true,
                choices: years,
            },
            {
                name: 'mes',
                description: 'O mês que será consultado',
                type: 3, // ApplicationCommandOptionType.String
                required: true,
                choices: months,
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
