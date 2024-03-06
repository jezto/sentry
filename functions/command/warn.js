// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let event = context.params.event;

let isKICK_MEMBERS =
  (context.params.event.member.permissions & (1 << 1)) === 1 << 1;

if (isKICK_MEMBERS) {
  let userId = context.params.event.data.options[0].value;
  let reason = event.data.options[1].value;
  let guild = await lib.discord.guilds.retrieve({
    guild_id: context.params.event.guild_id, // required
  });

  await lib.discord.users.dms.create({
    recipient_id: `${userId}`,
    content: '',
    embed: {
      type: 'rich',
      title: `**You have been warned!**`,
      description: `
Server: ${guild.name}
Reason: ${reason}
Moderator: <@${context.params.event.member.user.id}>

Kindly follow the server rules and be respectful to others!`,
      color: 0x42aadd,
    },
  });
  await lib.discord.channels.messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: '',
    embed: {
      type: 'rich',
      title: 'User Warned!',
      description: `<@${userId}> has been warned for the reason: **${reason}** by <@${context.params.event.member.user.id}>
      
      Kinldy refrain from doing so.`,
    },
  });
} else {
  await lib.discord.channels.messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `**<@${context.params.event.member.user.id}> - You need the KICK_MEMBERS permission to use the Warn command!**`,
  });
}
