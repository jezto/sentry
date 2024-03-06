// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let isBAN_MEMBERS =
  (context.params.event.member.permissions & (1 << 2)) === 1 << 2;

if (isBAN_MEMBERS) {
  let userId = context.params.event.data.options[0].value;
  let reason = context.params.event.data.options[1].value;
  let guild = await lib.discord.guilds.retrieve({
    guild_id: context.params.event.guild_id, // required
  });

  await lib.discord.users.dms.create({
    recipient_id: `${userId}`,
    content: '',
    embed: {
      type: 'rich',
      title: `**You were banned!**`,
      description: `
      Server: ${guild.name}
      Reason: ${reason}
      Moderator: <@${context.params.event.member.user.id}>
      
      Kindly follow the server rules and be respectful to others!`,
      color: 0x42aadd,
    },
  });
  let result = await lib.discord.guilds.bans.create({
    user_id: `${userId}`,
    guild_id: `${context.params.event.guild_id}`,
    reason: `${reason}`,
  });

  await lib.discord.channels.messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: ``,
    embed: {
      type: 'rich',
      title: 'User Kicked!',
      description: `<@${userId}> has been banned for the reason: **${reason}** by <@${context.params.event.member.user.id}>
      
      He should get a beating, Hmm...`,
    },
  });
} else {
  await lib.discord.channels.messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `<@${context.params.event.member.user.id}> - You don't hold the required permission to ban members!`,
  });
}
