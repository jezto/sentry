const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let event = context.params.event;
let latency = new Date() - new Date(context.params.event.received_at);
await lib.discord.channels.messages.create({
  channel_id: event.channel_id,
  content: `Pong! 
Latency: ${latency}ms`,
});