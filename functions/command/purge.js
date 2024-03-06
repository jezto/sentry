const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

if (!context.params.event.member.permission_names.includes('MANAGE_MESSAGES')) {
  await lib.discord.channels.messages.create({
    channel_id: context.params.event.channel_id,
    content: `Sorry, you don't have permission to use this command! <@${context.params.event.member.user.id}>`,
  });
  return;
}
let amount = context.params.event.data.options[0].value;
let userID = context.params.event.data.options[1]
  ? context.params.event.data.options[1].value
  : null;
let messages = await lib.discord.channels.messages.list({
  channel_id: context.params.event.channel_id,
  limit: 100,
});
let messages_to_delete = messages.map((m) => m.id).slice(0, amount);
if (userID) {
  messages_to_delete = messages
    .filter((m) => m.author.id === userID)
    .map((m) => m.id)
    .slice(0, amount);
}
if (amount <= 1) {
  await lib.discord.channels.messages.destroy({
    message_id: messages_to_delete[0],
    channel_id: context.params.event.channel_id,
  });
  return;
} else if (amount > 100) {
  await lib.discord.channels.messages.create({
    channel_id: context.params.event.channel_id,
    content: `Cannot purge messages more than 100! <@${context.params.event.member.user.id}>`,
  });
  return;
}
try {
  await lib.discord.channels.messages.bulkDelete({
    channel_id: context.params.event.channel_id,
    messages: messages_to_delete,
  });
  await lib.discord.channels.messages.create({
    channel_id: context.params.event.channel_id,
    content: ``,
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `Message purged!`,
        description: userID
          ? `${amount} messages by <@${userID}> has been deleted in <#${context.params.event.channel_id}>`
          : `${amount} messages has been deleted in <#${context.params.event.channel_id}>`,
        color: 0x42aadd ,
        timestamp: `${context.params.event.received_at}`,
        footer: {
          text: `${context.params.event.member.user.username}#${context.params.event.member.user.discriminator}`,
        },
      },
    ],
  });
} catch (e) {
  await lib.discord.channels.messages.create({
    channel_id: context.params.event.channel_id,
    content: `An error occured while purging the messages! ${context.params.event.member.user.id}`,
  });
}
