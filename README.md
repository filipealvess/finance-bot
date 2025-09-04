# 🤖 Finance Bot

Bot do Discord para controle de finanças pessoais (receitas vs despesas)

## Como usar

1. Abra este link no navegador: https://discord.com/oauth2/authorize?client_id=1409673103344271513
2. Selecione a conta e o servidor do Discord que o Bot terá acesso  
2.1. O Bot terá acesso ao histórico de mensagens e poderá enviar mensagens no canal
3. Envie mensagens usando os _slash commands_ disponíveis  
3.1. Exemplo: `/receita` para cadastrar uma receita

## Como executar localmente

1. Crie um bot no [painel do desenvolvedor do Discord](https://discord.com/developers/applications)
2. Crie um arquivo `.env` baseado no `.env.example`
3. Atualize as variáveis com os dados do seu bot
4. Execute `npm install` para configurar o ambiente
5. Execute `npm run config` para cadastrar os _slash commands_ no seu bot
6. Execute `npm start` para deixar seu bot disponível
7. Siga os passos de ["Como usar"](#como-usar), trocando o `client_id` pelo ID do seu bot

## Capturas de tela

### Histórico
<img width="1920" height="961" alt="history" src="https://github.com/user-attachments/assets/6e86d4ef-c7b0-40da-a0aa-b1be2f54187a" />

### Comandos
<img width="1920" height="961" alt="commands" src="https://github.com/user-attachments/assets/0dc629f3-4547-4797-ac8e-b6c5120fcc8c" />

### Categorias
<img width="1920" height="961" alt="categories" src="https://github.com/user-attachments/assets/cebbb7e6-5de4-45be-ab8e-ffabd48f2c4d" />

### Dados preenchidos
<img width="1920" height="961" alt="expense-data" src="https://github.com/user-attachments/assets/d4710701-4fb1-4695-a561-97f572dd4532" />
