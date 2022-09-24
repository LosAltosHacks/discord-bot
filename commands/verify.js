const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');
const { generateWarningEmbed, generateEmbed } = require('../tools');
const axios = require('axios');

async function verify(interaction, email, token) {
  if (!token) return;

  // Now that we have the token, we can use it to see if the email is registered
  const verifyOptions = {
    method: 'GET',
    url: 'https://api.losaltoshacks.com/attendees/search?email=' + email,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  axios(verifyOptions)
    .then(function (response) {
      if (response.data.length > 0) {
        // exists
        const data = response.data[0];
        interaction.member.roles
          .add(config.attendeeRole)
          .catch(function (error) {
            console.log(
              '### This is very likely because you have tried running the command as a role higher than the bot!!! ###',
            );
            console.error(error);
          });
        interaction.member
          .setNickname(data.first_name + ' ' + data.last_name)
          .catch(function (error) {
            console.log(
              '### This is very likely because you have tried running the command as a role higher than the bot!!! ###',
            );
            console.error(error);
          });
        interaction.reply({
          embeds: [
            generateEmbed(
              'Verified!',
              "You are now verified! You'll gain access to the rest of the server soon.",
            ),
          ],
          ephemeral: true,
        });
      } else {
        interaction.reply({
          embeds: [
            generateWarningEmbed(
              'Error!',
              "Looks like you haven't registered yet. You can do so at www.losaltoshacks.com/registration! If you think this is a mistake, contact staff with `/staff`",
            ),
          ],
          ephemeral: true,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
      interaction.reply({
        embeds: [
          generateWarningEmbed(
            'Error!',
            'Oops, something went wrong. Please inform staff with `/staff`.',
          ),
        ],
        ephemeral: true,
      });
    });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription(
      'Verify your Discord account to gain access to the rest of the server.',
    )
    .addStringOption((option) =>
      option
        .setName('email')
        .setDescription('Enter the email you registered with')
        .setRequired(true),
    ),
  async execute(client, interaction) {
    if (interaction.channelId !== config.verifyChannel) {
      interaction.reply({
        embeds: [
          generateWarningEmbed(
            'Error!',
            'You can only use the `/verify` command in the verification channel.',
          ),
        ],
        ephemeral: true,
      });
      return;
    }

    const email = interaction.options.getString('email');

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
      interaction.reply({
        embeds: [generateWarningEmbed('Error!', 'Please enter a valid email!')],
        ephemeral: true,
      });
      return;
    }

    // Below is taken from last year's bot

    const options = {
      method: 'POST',
      url: 'https://api.losaltoshacks.com/auth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: new URLSearchParams({
        username: config.apiUsername,
        password: config.apiPassword,
      }),
    };

    axios(options)
      .then(function (response) {
        const BACKEND_JWT_TOKEN = response.data.access_token;
        verify(interaction, email, BACKEND_JWT_TOKEN);
      })
      .catch(function (error) {
        if (error) {
          console.log(error);
          interaction.reply({
            embeds: [
              generateWarningEmbed(
                'Error!',
                'Oops, something went wrong. Please inform staff with `/staff`.',
              ),
            ],
            ephemeral: true,
          });
        }
      });
  },
};
