const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const event = context.params.event

// Get the message the user entered
const content = event.data.options[0].value

// Send the message to channel as the bot
if (event.member.permission_names.includes('BAN_MEMBERS'))
  await lib.discord.channels.messages.create({
    channel_id: event.channel_id, content,
  });