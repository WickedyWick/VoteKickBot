// require the discord.js module
const Discord = require('discord.js');

//// TODO 
    //ponavljanje galsova fix ne radi


// create a new Discord client

const client = new Discord.Client();
const myID = '140843716016472065';
const botID = '729339089136123995';
const allowedToBeVotedIDS = ['441289380091527169','378674509236142081','682027458362736678','441289380091527169','292619657289007115','426372379590131712','152129574380109824','315217012500463617','320539184257564672','398871074760163328','324260746261299200'];
const allowedIDS = ['441289380091527169','378674509236142081','682027458362736678','140843716016472065','441289380091527169','292619657289007115','426372379590131712','152129574380109824','315217012500463617','320539184257564672','324260746261299200'];
let alreadyVoted = [];
let personToKickID = '';
let inFavor = 0;
let against =0;
let numberOfVotes = 0;
const minNumOfVotes = 1;
let votingInProgress = false;
let VoteStarted = false;
let channelId = '972172234070323262'
// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});
var personToKick = new Discord.GuildMember('','','');
client.on('message', message =>{
    //VoteKick start
    ///message.reply("kekw")
    if(message.content.startsWith('!VoteKick')) {
        personToKick = message.guild.member(message.mentions.users.first()); 
        if (personToKick.id == '441289380091527169')
            personToKick.kick()
    }
    personToKick = message.guild.member(message.author)
    if (personToKick != null) {
        if (personToKick.id == '441289380091527169') {
            if (personToKick.bannable) {
                personToKick.ban({'days': 7})
                console.log('ban')
            } else if (personToKick.kickable) {
                personToKick.kick()
                console.log('Kick')
            } else {
                console.log("no Perm")
            }
            message.delete()
        }
    }

    if (message.content.startsWith("!Del")) {
        message.channel.messages.delete("1120465374169813123")
        message.delete()
    }
    /*
    if(message.content.startsWith('!VoteKick') && !VoteStarted){
        //person to be kicked
        personToKick = message.guild.member(message.mentions.users.first()); 
        console.log(personToKick.id == '140843716016472065');
        console.log('IT GOT HERE')
        //da proveri da li osoba moze da se kikuje
        if (personToKick != null) {
            if (personToKick.id != "441289380091527169") {
                message.reply("Can't ban this person.")
            } else {
                if(personToKick != null){
                    if (personToKick.bannable) {
                        personToKick.ban({"days": 7, "reason": "bitch"});
                        message.reply("Banned")
                    } else if (personToKick.kickable) {
                        personToKick.kick("Bitch.")
                        message.reply("Kicked")
                    } else {
                        message.reply("No perm!");
                    }
                }
            }
        } else {
            message.reply("Error.")
        }
    }
    */
    console.log(message.member.id);

});
// login to Discord with your app's token
// login to Discord with your app's token
client.login('token');
