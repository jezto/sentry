const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.3.2'].messages.create({
  "channel_id": `${context.params.event.channel_id}`,
  "content": "",
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": `Summoned`,
      "description": `Yes, you summoned the Sentry. My prefix is `-` and the below shown are the commands that are currently available.`,
      "color": 0x42aadd,
      "fields": [
        {
          "name": `help`,
          "value": `Shows this page`
        },
        {
          "name": `ping`,
          "value": `Check the bot latency, Pong!`
        },
        {
          "name": `info`,
          "value": `Shows the bot information`
        }
      ]
    }
  ]
});