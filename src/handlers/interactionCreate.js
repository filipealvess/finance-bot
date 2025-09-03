import {insert} from '../db/index.js';


function reduce(interaction) {
    const value = interaction.options.getNumber('valor');
    const category = interaction.options.getString('categoria');

    return {
        category: category.toLowerCase(),
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
        await interaction.reply({content: 'Falha ao salvar receita'});
        return;
    }

    console.log(`[INFO] Income stored`);
    console.log(data);

    await interaction.reply({
        content: `Receita de **R$ ${data.value}** com **${data.category}** registrada com sucesso!`,
    });
}

async function handleExpense(interaction) {
    const data = reduce(interaction);
    const result = await insert(data);

    if (result === null) {
        console.error(`[ERROR] Failed to insert expense`);
        console.error(data);
        await interaction.reply({content: 'Falha ao salvar despesa'});
        return;
    }

    console.log(`[INFO] Expense stored`);
    console.log(data);

    await interaction.reply({
        content: `Despesa de **R$ ${data.value}** com **${data.category}** registrada com sucesso!`,
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
}

export default handleinteractionCreate;
