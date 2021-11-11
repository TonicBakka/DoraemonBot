const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const ytdl = require('discord-ytdl-core');
//-----------------------------------------
const cmd = console.log;
var cmdno = 1;
//-----------------------------------------
client.login('//token');
//-----------------------------------------
client.on('ready',() => {
    client.user.setActivity("Doraemonn");
    client.user.setStatus('dnd');
    console.clear();
    cmd(`=======================================`);
    cmd(`[*]Logged in as ${client.user.username}`);
})

client.on(`message`, message => {  

//Variables____________________________________________________________________________________________
var prefix = `!`;
const username = message.member.user.username;
const reply = message.channel;
const input = message.content.slice().trim().split(/ +/g);
//cmd(`Input is ${input} and ${input[1]}` );


//Function (message), (join vc), (leave vc)__________________________________________________________
    function cmdfunc(emote) {
           cmd(`[${cmdno}]Commencing emote upload(${input}) by ${username}`) 
            cmdno++;
            reply.send(emote);
    }
    function joinvc() {
            if(!message.member.voice.channel ){
            reply.send(`No user found in vc.`)
            cmd(`[${cmdno}]Request to join VC from ${username} rejected`)    
            cmdno++;
            }else{
            reply.send(`Joining VC`)
            cmd(`[${cmdno}]${username} found in vc. Joining the VC`)
            message.member.voice.channel.join()
            cmdno++;
    }
    }
    function leavevc(){
        if(!message.member.voice.channel){
            reply.send(`No user found in vc`)
            cmd(`Request to leave vc from ${username} rejected`)
            cmdno++;
        }else{ 
            reply.send(`Leaving VC!`)
            cmd(`Leaving VC on request of ${username}`)
            message.member.voice.channel.leave();
            cmdno++;
        }
          
    }
   
    function playvc(mURL){
    reply.send(`Playing music`);
    cmd(`[${cmdno}]Playing music, ${mURL}`);
    cmdno++;
    const musicem = new Discord.MessageEmbed()
    .setTitle(`Playing music`)
    .setDescription(`request by ${username}`)
    .setColor(`#df73ff`)
    .setImage(mURL)
    reply.send(musicem);
    ytdl(`${mURL}`,{ filter : "audioonly", fmt : "mp3"}).pipe(fs.createWriteStream(`music.mp3`))
    message.member.voice.channel.then(connection => {const dispatcher = connection.play(`./music.mp3`);
    dispatcher.on('end', end => {message.member.voice.channel.leave();})
    
    }).catch(err=> {cmd(err);})
        
        cmd(`[${cmdno}]Music finished`);
        cmdno++;

    }
   
    function av(){

        cmd(`[${cmdno}]Commencing: making embed(${username})`)
        cmdno++;
        const avatar = new Discord.MessageEmbed()
        .setTitle(`Username : ${message.author.username}`)
        .setDescription(`Id : ${message.member.user.id}`)
        .setColor(`#4cff4c`)
        .setImage(message.author.avatarURL())
        reply.send(avatar);
        cmd(`[${cmdno}]Embed of user profile of author ${username} send`)
        cmdno++;
    }
 
    function math(x,y,operation){
    var z = 0;
    switch (operation){
    case '+' :
         z = x+y;
        break;
    case '-' :
         z = x-y;
        break;
    case '*' :
         z = x*y;
        break;
    case '/' :
         z = x/y;

        break;
    case '^' :
         z = Math.pow(x,y);
        break;


    }
    const solution = new Discord.MessageEmbed()
    .setTitle(`Given, ${x} ${operation} ${y}`)
    .setDescription(`The solution is ${z}.`)
    .setColor(`#4c4cff`)
    .setImage(`https://i.gifer.com/origin/a2/a29beb714e52d89adfa7db0d139d061c_w200.gif`)
    reply.send(solution);
    cmd(`[${cmdno}]Math function ${operation} by ${username}, where x :${x}, y :${y}, and solution :${z}`)
    cmdno++;
   }

//Switch case input (emotes) , (latency)______________________________________________________________________

switch (input[0]){   
    case 'hi' :
        message.reply(`hey, what are you doing??`);
        break;
    case  'bruh' :
        cmdfunc(`:weary:`);
        break;    
    case 'kiss' :
        cmdfunc(`:kissing_heart:`);
        break;
    case 'cringe' :
        cmdfunc(`:grimacing:`);
        break;
    case 'drip' :
        cmdfunc(`:sunglasses:`);
        break;
    case 'lmao' :
        cmdfunc(`:joy:`);
        break;
    case 'ping' :
        cmdfunc(`The Latency is ${client.ws.ping} ms~`);
        break;
    case 'join' :
        joinvc()
        break;        
    case 'leave' :
        leavevc()
        break;
    case 'play' :
        playvc(input[1]);
        break;
    case 'av' :
        av()
        break;
    case 'math' :
        const inputmath = input[1].split('');  
        cmd(inputmath);
        math(parseInt(inputmath[0],10),parseInt(inputmath[2],10),inputmath[1]);
        break;    
        
}
    

})
