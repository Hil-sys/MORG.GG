const Discord = require('discord.js');
const Canvas = require('canvas');
const bot = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');
//const db = require("quick.db");
//const { checkServerIdentity } = require('node:tls');
const wait = require('util').promisify(setTimeout);
const prefix = '+';
const request = require('request');
let config = require('./config.json');
let token = config.token;
const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
let tam = '';
let prof = require('./p.json');
let lvl2 = prof.lvl;
const us1 = '';

//const r_s=7;
//const r_c= new Array(r_s);
//const r_p=0;
//const guild = bot.guilds.first();
const rus = [
  '``ты гей🌈``',
  '``ты не гей🔥``'
];
const anime = [
  'https://tenor.com/view/cute-anime-dancing-silly-happy-excited-gif-13462237',
  'https://tenor.com/view/anime-kafuu-chino-okuda-yousuke-swinging-white-fox-gif-10654450',
  'https://64.media.tumblr.com/c5c260dcb303f9c2414485a69f057fcb/tumblr_nzk87vmJ1c1uz8vb5o1_500.gif',
  'https://tenor.com/view/anime-love-cute-smile-gif-15836771',
  'https://tenor.com/view/blends-anime-maika-gif-10176024',
  'https://tenor.com/view/chuunibyou-anime-kawaii-yes-gif-8215787',
  'https://tenor.com/view/anime-zero-two-darling-in-the-franxx-cute-smile-gif-14500398',
  'https://tenor.com/view/sasuke-thinking-anime-naruto-gif-13593873',
  'https://tenor.com/view/eating-anime-gif-14083074',
  'https://tenor.com/view/sleepy-anime-tired-bored-gif-12003953',
  'https://tenor.com/view/anime-gif-10838324',
  'https://tenor.com/view/cute-anime-girl-kawaii-confused-gif-4955442',
  'https://tenor.com/view/cry-sad-why-anime-himouto-gif-5298257',
  'https://tenor.com/view/anime-couple-hug-cute-cuddle-gif-14898682',
  'https://tenor.com/view/anime-head-pat-anime-head-rub-neko-anime-love-anime-gif-16121044',
  'https://tenor.com/view/love-cheek-peck-kiss-anime-gif-17382412',
  'https://tenor.com/view/lil-peep-sad-anime-dark-gif-14910500',
  'https://tenor.com/view/sad-anime-crying-gif-5091716',
  'https://tenor.com/view/nezuko-chan-anime-demon-slayer-sit-gif-15979881',
  'https://tenor.com/view/hearts-love-smile-happy-anime-gif-16038266',
  'https://tenor.com/view/teria-wang-kishuku-gakkou-no-juliet-hug-anime-gif-16509980',
  'https://tenor.com/view/anime-gif-21204185',
  'https://tenor.com/view/anime-couple-anime-kiss-couple-kiss-anime-gif-21164419',
  'https://tenor.com/view/anime-gif-21112245',
  'https://tenor.com/view/anime-couple-kiss-anime-gif-21171309',
  ]

bot.once("ready", () => {
    console.log(bot.user.username + " готов!!!!!!");
  
    let users;
    let guilds;
    bot.users.cache.tap((coll) => (users = coll.size));
    bot.guilds.cache.tap((coll) => (guilds = coll.size));
    const status = [
      {
        activity: "+информация | MORGENSLAV.GG",
        type: "WATCHING",
      },
      {
        activity: `за ${users} пользователями на ${guilds} servers.`,
        type: "WATCHING",
      },
      {
        activity: "с писькой",
        type: "PLAYING",
      },
      {
        activity: "Cristalix",
        type: "PLAYING",
      },
      {
        activity: "Тиранию вооруженных девушек",
        type: "WATCHING",
      },
      {
        activity: "Японский роцк",
        type: "LISTENING",
      },
      {
        activity: "инвангая",
        type: "WATCHING",
      },
    ];
    let random = status[Math.floor(Math.random() * Math.floor(status.length))];
    bot.user.setActivity(random.activity, {
      type: random.type,
    });
    setInterval(async function () {
      bot.users.cache.tap((coll) => (users = coll.size));
      bot.guilds.cache.tap((coll) => (guilds = coll.size));
      random = status[Math.floor(Math.random() * Math.floor(status.length))];
      bot.user.setActivity(random.activity, {
        type: random.type,
      });
    }, 60000);
//bot.user.setActivity(`за ${users} пользователями на ${guilds} servers`,{type:"WATCHING"})

//    let command_file = bot.commands.get(command.slice(prefix.length)) 
//    if (command_file) command_file.run(bot, message, args)

//    checkTime();

/*for (var i=0; i < r_s; i++) {
  var red   = sin_to_hex(i, 0 * Math.PI * 2/3); // 0   deg
  var blue  = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
  var green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg

  r_c[i] = '#'+ red + green + blue;
}

bot.setTimeout(checkTime, 60 * 1000);
*/
});


/*bot.on("message", async (message) => {

  if (
    message.content == `<@${bot.user.id}>` ||
    message.content == `<@!${bot.user.id}>`
  )
    return message.channel.send(`префикс мой \`${prefix}\`.`);

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    bot.commands.get(commandName) ||
    bot.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (command.guildOnly && message.channel.type !== "text") {
    return message.reply("незя сюда писать, даун");
  }

  if (command.args && !args.length) {
    let reply = `не нашел подходящего аргумента!`;

    if (command.usage) {
      reply += `\nиспользовано \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.reply(reply);
  }

  if (command.permission) {
    if (
      !message.guild.member(message.author).hasPermission(command.permission)
    ) {
      return message.reply(
        `даун!\nдаун \`${command.permission}\` не можешь юзать`
      );
    }
  }
});
*/


/*bot.on('message', msg => {
    if (msg.content === `${prefix}проверка`) {
      msg.reply('Ты слит');
    }
});
*/
/*fs.readdir('./commands', (err, files) => {
  if (err) console.log(err)

  let jsfile = files.filter(f => f.split('.').pop() === 'js')
  if (jsfile.length <= 0) return console.log('слава ты аут')

  console.log(`работает ${jsfile.length} комманд`)
  jsfile.forEach((f, i) => {
      let props = require(`./commands/${f}`)
      bot.commands.set(props.name, props)
  })
})
*/



bot.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'котики') {
		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

		message.channel.send(file);
	} 
	}
);

bot.on('message', msg => {
  let a = msg.author.id;
  if(!prof[a]){
    prof[a]={
      lvl:0,
      exp:0
    };
  };
  let b = prof[a];
    b.exp ++;
  
  if(b.exp>=(b.lvl*3)){
    b.exp=0;
    b.lvl += 1;
  }
  fs.writeFile('./p.json', JSON.stringify(prof),(err)=>{
    if(err) console.log(err);
  })
});

/*function checkTime(){

  var role = guild.roles.get("id");

  if (role != undefined) {
    role.setColor(r_c[r_p])
        .catch(console.log);
        if (r_p == (r_c.length - 1)) {
            r_p = 0;
        } else {
            r_p++;
        }
}
  bot.setTimeout(checkTime, 60 * 1000);
}


function sin_to_hex(i, phase) {
  var sin = Math.sin(Math.PI / r_c.length * 2 * i + phase);
  var int = Math.floor(sin * 127) + 128;
  var hex = int.toString(16);

  return hex.length === 1 ? '0'+hex : hex;
};
*/

bot.on('message', msg => {
  if (msg.content === `${prefix}лвл`) {
    let lvlid = msg.author.id
    let lvl1 = require('./p.json')
    let lvll = lvl1.lvl;
    const embed1 = new MessageEmbed()
      .setColor(700000)
      .setDescription(`Ваш уровень ${lvll}`);
    msg.channel.send(embed1);
  }
});

bot.on('messageUpdate', async (oldmsg, newmsg) => {
  let iz = new Discord.MessageEmbed()
    .setAuthor('Сообщение изменено', newmsg.guild.iconURL)
    .addField('Отправитель', oldmsg.member, true)
    .addField('Канал', oldmsg.channel, true)
    .addField('Раньше', oldmsg.content)
    .addField('Сейчас', newmsg.content)
    .setColor(500000)
    .setTimestamp()
  await oldmsg.channel.send(iz)
});

bot.on('messageDelete', async message => {
  let iz1 = new Discord.MessageEmbed()
    .setAuthor('Сообщение удалено', message.guild.iconURL)
    .addField('Отправитель', message.member, true)
    .addField('Канал', message.channel, true)
    .addField('Содержание', message.content)
    .setColor(300000)
    .setTimestamp()
  await message.channel.send(iz1)
});

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

bot.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'приветствие');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./pic3.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	//ctx.font = '28px sans-serif';
	//ctx.fillStyle = '#ffffff';
//	ctx.fillText('Привет', canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'w-i.png');
/*
  const hi = [
    `Привет ${member}!`,
    `Добро пожаловать ${member}!`,
    `Ты к нам не с пустыми руками ${member}!`,
    `Лютый ${member} залетел на сервак, йоу!`,
    `Приятно познакомится ${member}!`,
    `${member} удачи тебе!`
  ]
*/
await	channel.send('маипав', attachment, err);
});


bot.on('guildMemberRemove', async member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'приветствие');
	if (!channel) return;
  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./pic6.jpg');

	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

//	ctx.font = '28px sans-serif';
//	ctx.fillStyle = '#ffffff';
//	ctx.fillText('Добро пожаловать на сервер,', canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.displayName}`);
	ctx.fillStyle = '#e8d779';
	ctx.fillText(`${member.displayName}`, canvas.width / 2.8, canvas.height / 3.5);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'w-i.png');

  const bye = [
    `Прощай ${member}!`,
    `Заходи еще ${member}!`,
    `Без тебя на сервере на 1 участника меньше ${member}!`,
    `Лютый ${member} вылетел с сервера!`
  ]

  await channel.send(bye[Math.floor(Math.random() * bye.length)], attachment, err)
});

/*bot.on('message', async message => {
    db.add(`messages_${message.guild.id}_${message.author.id}`, 1)
    let messagefetch = db.fetch(`messages_${message.guild.id}_${message.author.id}`)

    let messages;
    if (messagefetch == 25) messages = 25; //ето левели с 1
    else if (messagefetch == 65) messages = 65;
    else if (messagefetch == 115) messages = 115
    else if (messagefetch == 200) messages = 200;
    else if (messagefetch == 300) messages = 300;
    else if (messagefetch == 450) messages = 450;
    else if (messagefetch == 600) messages = 600;
    else if (messagefetch == 900) messages = 900;
    else if (messagefetch == 1250) messages = 1250;
    else if (messagefetch == 1700) messages = 1700;

    if (!isNaN(messages)) {
      db.add(`level_${message.guild.id}_${message.author.id}`, 1)
      let levelfetch = db.fetch(`level_${message.guild.id}_${message.author.id}`)
  
    let levelembed = new Discord.RichEmbed()
    .setDescription(`${message.author}, твой уровень - ${levelfetch}`)
     message.channel.send(levelembed)
}*/



//}) 

/*function checkTime() {
  getHTTPResponce('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22')
    .then((body) => { 
      var result = JSON.parse(body);
      var temp = parseInt(result.main.temp) - 273.15; 

      bot.channels.get("834863628561678371").setName(`Погода в Лондоне: ${temp}`);
      console.log(`200 Result: ${body}`)
    })
    .catch((error) => { 
      console.log(`error: ${error}`);
    })
    var now = new Date(); 
    bot.setTimeout(checkTime, (59 - now.getUTCMinutes()) * 60 * 1000);
}

function getHTTPResponce (url) {
  return new Promise((resolve, reject) => { 
    var options = { 
      method: "GET",
      url: url, 
      headers: { 
          'User-Agent': 'nodejs request',
          'X-Key': "9qpRc8M55pFb8qDN94jH"
      }
    }
    request(options, (error, responce, body) => { 
      if (responce.statusCode != 200) {
        reject(error);
      }  else {
        resolve(body);
      }
    })
  });
}
*/

const quiz =
[
	{
		"question": "ты",
		"answers": ["да"]
	},
	{
		"question": ".",
		"answers": [".", ".", ".", "."]
	}
]

bot.on('message', message => {
  if (message.content === `${prefix}вопрос`) {
const item = quiz[Math.floor(Math.random() * quiz.length)];
const filter = response => {
	return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};

message.channel.send(item.question).then(() => {
  const cenko = 'https://tenor.com/view/hearts-love-smile-happy-anime-gif-16038266'
	message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
		.then(collected => {
			message.channel.send(`${collected.first().author} красава https://tenor.com/view/hearts-love-smile-happy-anime-gif-16038266`);
		})
		.catch(collected => {
			message.channel.send('Ты down');
		});
});
  }
});


const anime1 =
[
	{
		"question": "1 - Сэнко   2 - Широ   3 - Сатори Тамаба",
		"answers": ["1"]
	}
]
const cenko = 'https://tenor.com/view/hearts-love-smile-happy-anime-gif-16038266'
const shir = 'https://tenor.com/view/anime-head-pat-anime-head-rub-neko-anime-love-anime-gif-16121044'
const tamaba = 'https://pa1.narvii.com/6869/d9517ae52ebc61e55ce499bde0475e91e209d04er1-540-307_hq.gif'
bot.on('message', message => {
  if (message.content === `${prefix}герой из аниме`) {
const item = anime1[Math.floor(Math.random() * anime1.length)];
const filter = response => {
	return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};
message.channel.send(item.question).then(() => {
  message.channel.awaitMessages(filter, { max: 1, time: 4000, errors: ['time'] })
		.then(collected => {
			message.channel.send(`${collected.first().author} окей`);
      message.channel.send(`${cenko}`);
		})
//    .catch(collected => {
//			message.channel.send(`${message.author} держи`);
//		});
});
  }
});

const anime2 =
[
	{
		"question": "1 - Сэнко   2 - Широ",
		"answers": ["2"]
	}
]
bot.on('message', message => {
  if (message.content === `${prefix}герой из аниме`) {
const item = anime2[Math.floor(Math.random() * anime2.length)];
const filter = response => {
	return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};

message.channel.send(`╷`).then(() => {
  message.channel.awaitMessages(filter, { max: 1, time: 4000, errors: ['time'] })
		.then(collected => {
			message.channel.send(`${collected.first().author} окей`);
      message.channel.send(`${shir}`);
		})
//    .catch(collected => {
//			message.channel.send(`${message.author} держи`);
//		});/
});
  }
});

const anime3 =
[
	{
		"question": "1 - Сэнко   2 - Широ",
		"answers": ["3"]
	}
]
bot.on('message', message => {
  if (message.content === `${prefix}герой из аниме`) {
const item = anime3[Math.floor(Math.random() * anime3.length)];
const filter = response => {
	return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};

message.channel.send(`⏊`).then(() => {
  message.channel.awaitMessages(filter, { max: 1, time: 4000, errors: ['time'] })
		.then(collected => {
			message.channel.send(`${collected.first().author} окей`);
      message.channel.send(`${tamaba}`);
		})
//    .catch(collected => {
//			message.channel.send(`${message.author} держи`);
//		});/
});
  }
});

/*const anime23 =
[
	{
		"question": "1 - Сэнко   2 - Широ",
		"answers": ["1",["2"]]
	}
]

bot.on('message', message => {
  if (message.content === `${prefix}герой из аниме1`) {
const item = anime23[Math.floor(Math.random() * anime23.length)];
const filter = response => {
	return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};
    const cenko = 'https://tenor.com/view/hearts-love-smile-happy-anime-gif-16038266'
    const shir = 'https://tenor.com/view/anime-head-pat-anime-head-rub-neko-anime-love-anime-gif-16121044'
message.channel.send(item.question).then(() => {
  message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
		.then(collected => {
      if(collected == '2') {
			message.channel.send(`${collected.first().author} окей`);
      message.channel.send(`${shir}`);
      }
      if(collected == '1') {
        message.channel.send(`${collected.first().author} окей`);
        message.channel.send(`${cenko}`);
        }
		})
    .catch(collected => {
			message.channel.send(`${message.author}Ты down`);
		});
});
  }
});
*/
bot.on('message', msg => {
  if (msg.content === `${prefix}информация`) {
    let usser = msg.author.username;
    let ava = msg.author.displayAvatarURL();
  const infa = new Discord.MessageEmbed()
	.setColor(700000)
	.setTitle('Информация')
	.setURL('https://discord.bio/p/moonprincess')
	.setAuthor(`${usser}`, `${ava}`, 'https://discord.bio/p/moonprincess')
//	.setDescription(`→ Я бот MORGENSLAV.GG🐸. Мой префикс перед сообщениями(${prefix})🤫. FAQ: https://vk.com/iasharik.`)
  .addField(`→ Я бот MORGENSLAV.GG🐸. Мой префикс перед сообщениями(${prefix})🤫. FAQ: https://vk.com/iasharik.`, '|', false)
	.setThumbnail('https://pa1.narvii.com/6869/d9517ae52ebc61e55ce499bde0475e91e209d04er1-540-307_hq.gif')
	.addFields(
		{ name: 'Список команд, которые я могу исполнять:', value: '|', inline: false },
    { name: `${prefix}проверка`, value: 'Проверка активности бота', inline: true },
    { name: `${prefix}аниме`, value: 'Показывает рандомную гифку с аниме', inline: true },
//		{ name: '\u200D', value: '\u200b' },
		{ name: `${prefix}ава`, value: 'Показывает твою аватарку', inline: true },
		{ name: `${prefix}русская-рулетка`, value: 'Выясняет кто ты', inline: true },
    { name: `${prefix}котики`, value: 'Показывает картинку с котиками', inline: true },
    { name: `${prefix}лвл`, value: 'Показывает твой уровень на сервере', inline: true },
    { name: `${prefix}герой из аниме`, value: 'Показывает героя из аниме, которого ты выберешь', inline: false },
	)
//	.addField(`${prefix}лвл`, 'Показывает твой уровень на сервере', true)
	.setImage('https://b1.filmpro.ru/c/638016.jpg')
	.setTimestamp()
	.setFooter(`By ${usser}`, `${ava}`);


msg.channel.send(infa);
  };
})

bot.on('message', message => {
  if (message.content === `${prefix}русская-рулетка`) {
    message.channel.send(rus[Math.floor(Math.random() * rus.length)]);
      }
});

  bot.on('message', message => {
    if (message.content === `${prefix}ава`) {
      message.channel.send(message.author.displayAvatarURL());
    }
  });

bot.on('message', msg => {
  if (msg.content === 'сам слит') {
    msg.reply('В мут на 5 мин. лети!');
  }
});

bot.on('message', msg => {
  if (msg.content === 'Сам слит') {
    msg.reply('В мут на 5 мин. лети!');
  }
});

bot.on('message', message => {
  if (message.content === `${prefix}аниме`) {
    message.channel.send(anime[Math.floor(Math.random() * anime.length)]);
      }
});

bot.login(token);
