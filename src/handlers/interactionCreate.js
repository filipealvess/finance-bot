async function handleIncome(interaction) {
    const value = interaction.options.getNumber('valor');
    const category = interaction.options.getString('categoria');

    console.log(`[INFO] Saved income "${value.toFixed(2)}" in category "${category}"`);

    await interaction.reply({
        content: `Receita de **R$ ${value.toFixed(2)}** com **${category}** registrada com sucesso!`,
    });
}

async function handleExpense(interaction) {
    const value = interaction.options.getNumber('valor');
    const category = interaction.options.getString('categoria');

    console.log(`[INFO] Saved expense "${value.toFixed(2)}" in category "${category}"`);

    await interaction.reply({
        content: `Despesa de **R$ ${value.toFixed(2)}** com **${category}** registrada com sucesso!`,
        flags: [],
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
