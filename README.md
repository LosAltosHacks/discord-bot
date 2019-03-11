# Los Altos Hacks IV Discord Bot
### Features
* Get staff assistance
* Answer frequently answered questions
* Verify attendee emails

### Set Up
First, clone this repository. Then create the file `secrets.json` with the following contents:
```json
{
	"DISCORD_DEVELOPER_SECRET": "your Discord bot client secret",
	"BACKEND_JWT_TOKEN": "your backent JWT token for the registration dashboard"
}
```

Next, install the dependencies:
```bash
npm install
```

Finally, start the Discord bot:
```bash
node app.js
```