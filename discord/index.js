import { Client, Events, GatewayIntentBits, Message } from 'discord.js';
import 'dotenv/config'
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });


client.on('messageCreate',(Message)=>{
    if(Message.author.bot) return;
    Message.reply({
        content:" hi from bot",
    });
});
client.login(process.env.TOKEN)

client.on("messageCreate",(Message)=>{
    if(Message.author.bot) return;
    if(Message.content.startsWith('create')){
        const url = Message.content.split('create')[1];
        return Message.reply({
            content: "genereting short id for url"+url,
        });
    };
});