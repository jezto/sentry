const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels.messages.create({
  "channel_id": `${context.params.event.channel_id}`,
  "content": "",
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": `Sentry Summoned`,
      "color": 0x42aadd,
      "description": "Yes, you summoned the Sentry. My prefix is `-` and the below shown are the available commands.",
      "fields": [
        {
          "name": `User Commands`,
          "value": `
          /help - Shows this page
          /ping - Pong! Shows latency
          
          `
        },
        {
          "name": `Moderation Commands`,
          "value": `
          /warn - Warn a user for bad behaviour
          /mute - Mute a user for x period
          /kick - Kick a user from the server
          /ban - Ban the user from the server
          /purge - Purge messages in a channel
          /embed - Create embed messages
          `
        }
      ]
    }
  ]
});
