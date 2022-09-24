const fs = require('node:fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
// const { clientId, clientSecret, guildId, token } = require('./config.json');
// const axios = require('axios');
// const { URLSearchParams } = require('url');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Registering commands
client.commands = new Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// Get Client Credentials/Bearer Token to register bot command permissions
// Add this line to config.json "clientSecret": "fGiqfbyrEr2LscUCtD0U2o6RUgxfwPnH",
// const options = {
//   method: 'POST',
//   url: 'https://discord.com/api/v10/oauth2/token',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   data: new URLSearchParams({
//     grant_type: 'client_credentials',
//     scope: 'identify connections',
//   }),
//   auth: {
//     username: clientId,
//     password: clientSecret,
//   },
// };

// const bearerToken = axios(options)
//   .then(function (response) {
//     return response.access_token;
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//     throw new Error(error);
//   });

// Ready-check
client.once('ready', async () => {
  console.log('Ready!');

  // const guild = client.guilds.cache.get(guildId);
  // await guild.commands.fetch().then((commands) =>
  //   commands.each((command) => {
  //     const prohibitedRoles = client.commands.get(command.name).prohibitedRoles;
  //     const permittedRoles = client.commands.get(command.name).permittedRoles;
  //     if (!prohibitedRoles && !permittedRoles) return;

  //     const prohibitedPermissions = prohibitedRoles
  //       ? prohibitedRoles.map((roleId) => {
  //           return {
  //             id: roleId,
  //             type: 'ROLE',
  //             permission: false,
  //           };
  //         })
  //       : [];
  //     const permittedPermissions = permittedRoles
  //       ? permittedRoles.map((roleId) => {
  //           return {
  //             id: roleId,
  //             type: 'ROLE',
  //             permission: true,
  //           };
  //         })
  //       : [];
  //     client.application.commands.permissions.set({
  //       token: bearerToken,
  //       guild: guildId,
  //       command: command.id,
  //       permissions: [...prohibitedPermissions, ...permittedPermissions],
  //     });
  //   }),
  // );
});

// Slash command handling
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(client, interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

client.login(token);
