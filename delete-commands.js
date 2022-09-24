const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');

const rest = new REST({ version: '10' }).setToken(token);

rest.get(Routes.applicationCommands(clientId)).then((data) => {
  for (const command of data) {
    const deleteURL = `${Routes.applicationCommands(clientId)}/${command.id}`;
    rest.delete(deleteURL);
  }
});
