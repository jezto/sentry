const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.3.2'].messages.create({
  "channel_id": `1213781070336630825`,
  "content": "",
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": `Welcome!`,
      "color": 0x42aadd,
      "description": `Welcome <@${userId}> to House No. 68G! Hope you have a great time here. Go through the information channel to know more about the channels.`,
      "fields": [
        {
          "name": `First things first!`,
          "value": `Make sure to go through the rules of the server!`
        }
      ],
      "image": {
        "url": `https://cdn-longterm.mee6.xyz/plugins/welcome_message/banners/1161666062819921920/welcome.png`,
        "height": 0,
        "width": 0
      },
      "footer": {
        "text": `Enjoy your stay!`
      }
    }
  ]
});