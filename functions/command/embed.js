const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let author = context.params.event.member;
if (author.permission_names.includes('EMBED_LINKS')) {
  // Command Option variables
  let title = context.params.event.data.options[0].value;
  let description = context.params.event.data.options[1].value;
  let color = context.params.event.data.options[2].value;
  let url = context.params.event.data.options[3];
  let image = context.params.event.data.options[4];
  let footer = context.params.event.data.options[5];
  // Converting Variables
  if (!url) {
    url = '';
  } else {
    url = url.value;
  }

  if (!image) {
    image = '';
  } else {
    image = image.value;
  }

  if (!footer) {
    footer = '';
  } else {
    footer = footer.value;
  }
  // Adds 0x to color value, and removes it as a string
  color = '0x' + color;
  color = parseInt(color, 16);

  // Creates embed
  await lib.discord.channels.messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: '',
    tts: false,
    embed: {
      type: 'rich',
      title: title,
      description: description,
      color: color,
      image: {
        url: image,
        height: 0,
        width: 0,
      },
      footer: {
        text: footer,
      },
      url: url,
    },
  });
} else {
  await lib.discord.channels.messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `❌ | You don't have permission to run that command, <@!${context.params.event.member.user.id}>`,
  });
}
