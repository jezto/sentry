// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.users['@0.1.0'].me.status.update({
  activity_name: `Jezto`, // Activity name, REQUIRED..
  activity_type: 'LISTENING', // Available Activity Types: WATCHING, LISTENING, GAME, STREAMING...
  url: '', //Set this if you make activity type STREAMING..
  status: 'IDLE', // Available Statuses: Do Not Disturb(Set To DND If you want to make this) , IDLE, ONLINE, INVISIBLE..
});


let members;
try { 
  members = await lib.discord.guilds['@0.3.4'].members.list({
    guild_id: `${context.params.event.guild_id}`,
    limit: 1000
  });
} catch (e) {
  await lib.discord.channels['@0.3.1'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: [
      `Whoops, it seems retrieving the number of members in the guild failed.`,
      `Your bot needs special permission to view the members in your guild.`,
      '',
      `You can check out the README for this Autocode app for help setting that up:`,
      'https://autocode.com/app/discord/basic-discord-example/'
    ].join('\n')
  });
  throw e;
}

let memberCountText = members.length < 1000 ? members.length : 'over 1000';

let messageResponse = await lib.discord.channels['@0.3.1'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: [
    `Hey <@!${context.params.event.member.user.id}>! I'm a bot powered by Autocode.`,
    `There are currently **${memberCountText}** users and bots in this guild.`
  ].join('\n'),
  embed: {
    title: 'Guild Information',
    type: 'rich',
    color: 0x0000AA, // Blue color
    description: 'You could add some information here for guild members to view!',
    fields: [{
      name: 'Message Formatting',
      value: [
        'Check out this link for more details on formatting message embeds:',
        'https://discord.com/developers/docs/resources/channel#embed-object-embed-structure'
      ].join('\n')
    }, {
      name: 'Setting up Slash Commands',
      value: [
        'Check out the README for this bot on Autocode for help setting up slash commands:',
        'https://autocode.com/app/discord/basic-discord-example/'
      ].join('\n')
    }]
  },
  tts: false
});

return messageResponse;