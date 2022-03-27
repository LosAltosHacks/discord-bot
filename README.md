# Los Altos Hacks VI Discord Bot

### Features

- Get staff assistance
- Answer frequently answered questions
- Verify attendee emails

### Changes

- Integrates new Discord slash commands, embeds, and buttons
- Upgrades from the depreciated [request](https://www.npmjs.com/package/request) module to [axios](https://github.com/axios/axios)

### Installation

First, clone this repository. Then create the file `config.json` with the following contents:

```json
{
  "token": "your Discord bot token",
  "clientId": "your Discord bot ID",
  "guildId": "hackathon guild ID",
  "staffChannelId": "channel ID to message staff contact notifications to",
  "verifyChannel": "channel to verify new users in",
  "attendeeRole": "role ID for attendees",
  "apiUsername": "username for API",
  "apiPassword": "password for API"
}
```

Next, install the dependencies:

```bash
npm install
```

Finally, start the Discord bot:

```bash
node index.js
```

or simply

```bash
node .
```
