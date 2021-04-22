const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageAttachment } = require('discord.js');

client.once("ready", () => {
    console.log(client.user.username + " готов!!!!!!");
  
    let users;
    let guilds;
    client.users.cache.tap((coll) => (users = coll.size));
    client.guilds.cache.tap((coll) => (guilds = coll.size));
    const status = [
      {
        activity: `за ${users} пользователями на ${guilds} servers`,
        type: "WATCHING",
      },
    ];
    let random = status[Math.floor(Math.random() * Math.floor(status.length))];
  client.user.setActivity(random.activity, {
    type: random.type,
  });
  setInterval(async function () {
    client.users.cache.tap((coll) => (users = coll.size));
    client.guilds.cache.tap((coll) => (guilds = coll.size));
    random = status[Math.floor(Math.random() * Math.floor(status.length))];
    client.user.setActivity(random.activity, {
      type: random.type,
    });
  }, 60000);
});

client.on('message', msg => {
    if (msg.content === '+проверка') {
      msg.reply('Ты слит');
    }
});

client.on('message', msg => {
  if (msg.content === '+информация') {
    msg.channel.send('→ Я бот MORGENSLAV.GG🐸. Мой префикс перед сообщениями(+)🤫. FAQ: https://vk.com/iasharik. Команды которые я могу исполнять:');
    msg.channel.send('+бяка - показывает гифку с Торадора'); 
    msg.channel.send('+проверка - проверка активности бота');
  }
});

client.on('message', message => {
    if (message.content === '+бяка') {
      const attachment = new MessageAttachment('https://cdn.discordapp.com/attachments/810938170710425613/834879455347998730/tumblr_nzk87vmJ1c1uz8vb5o1_500.gif');
      message.channel.send(attachment);
    }
  });

  client.on('message', message => {
    if (message.content === '+ава') {
      message.reply(message.author.displayAvatarURL());
    }
  });

  client.on('message', msg => {
    if (msg.content === 'сам слит') {
      msg.reply('В мут на 5 мин. лети!');
    }
});

client.login('Nzg3NzUwOTk4MzAzMDQ3Njkw.X9ZgSQ.ATYGss1lQRZp4ufbV9OQD2vswS4');