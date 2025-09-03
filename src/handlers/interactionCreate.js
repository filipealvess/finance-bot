import {insert, select} from '../db/index.js';
import {normalize} from '../utils/texts.js';


function reduce(interaction) {
    const value = interaction.options.getNumber('valor');
    const category = normalize(interaction.options.getString('categoria'));

    return {
        category,
        createdAt: new Date().toISOString(),
        id: interaction.id,
        type: interaction.commandName,
        user: interaction.member.user.username,
        value: value.toFixed(2),
    };
}

async function handleIncome(interaction) {
    const data = reduce(interaction);
    const result = await insert(data);

    if (result === null) {
        console.error(`[ERROR] Failed to insert income`);
        console.error(data);
        await interaction.reply({content: ':bangbang: Falha ao salvar receita'});
        return;
    }

    console.log(`[INFO] Income stored`);
    console.log(data);

    await interaction.reply({
        content: `:white_check_mark: Receita de **R$ ${data.value}** com **${data.category}** registrada com sucesso!`,
    });
}

async function handleExpense(interaction) {
    const data = reduce(interaction);
    const result = await insert(data);

    if (result === null) {
        console.error(`[ERROR] Failed to insert expense`);
        console.error(data);
        await interaction.reply({content: ':bangbang: Falha ao salvar despesa'});
        return;
    }

    console.log(`[INFO] Expense stored`);
    console.log(data);

    await interaction.reply({
        content: `:white_check_mark: Despesa de **R$ ${data.value}** com **${data.category}** registrada com sucesso!`,
    });
}

async function handleBalance(interaction) {
    const year = interaction.options.getString('ano');
    const month = interaction.options.getString('mes');
    const user = interaction.member.user.username;
    const monthText = String(Number(month) + 1).padStart(2, '0');
    const stored = await select();

    if (stored === null) {
        await interaction.reply({
            content: `:bangbang: Falha ao calcular saldo de **${monthText}/${year}**`,
        });
        return;
    }

    let income = 0;
    let expense = 0;

    for (let item in {}) {

    }

    stored.forEach(transaction => {
        const timestamp = new Date(transaction.createdAt);

        if (transaction.user !== user ||
            timestamp.getFullYear() !== Number(year) ||
            timestamp.getMonth() !== Number(month)) {
            return;
        }

        if (transaction.type === 'receita') {
            income += Number(transaction.value);
        }

        else if (transaction.type === 'despesa') {
            expense += Number(transaction.value);
        }
    });

    if (income === 0 && expense === 0) {
        console.log(`[INFO] No income/expense for "${monthText}/${year}"`);
        await interaction.reply({
            content: `:information_source: Nenhuma receita ou despesa cadastrada em **${monthText}/${year}**`,
        });
        return;
    }

    const balance = income - expense;
    const balanceText = balance < 0 ? `-R$ ${(balance * -1).toFixed(2)}` : `R$ ${(balance).toFixed(2)}`;

    console.log(`[INFO] Balance of "${monthText}/${year}" is "${balanceText}"`);

    await interaction.reply({
        content: `:clipboard: O saldo de **${monthText}/${year}** é de **${balanceText}**`,
    });
}

async function handleinteractionCreate(interaction) {
    const {commandName} = interaction;

    if (commandName === 'despesa') {
        await handleExpense(interaction);
    }

    else if (commandName === 'receita') {
        await handleIncome(interaction);
    }

    else if (commandName === 'saldo') {
        await handleBalance(interaction);
    }
}

export default handleinteractionCreate;
