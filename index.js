// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();
const myID = '140843716016472065';
const botID = '729339089136123995';
const allowedToBeVotedIDS = ['378674509236142081','682027458362736678','441289380091527169','292619657289007115','426372379590131712','152129574380109824','315217012500463617','320539184257564672'];
const allowedIDS = ['378674509236142081','682027458362736678','140843716016472065','441289380091527169','292619657289007115','426372379590131712','152129574380109824','315217012500463617','320539184257564672'];
let personToKickID = '';
let inFavor = 0;
let against =0;
let numberOfVotes = 0;
const minNumOfVotes = 5;
let votingInProgress = false;
let VoteStarted = false;
// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});
let personToKick = new Discord.GuildMember();
client.on('message', message =>{
    //VoteKick start
    if(message.content.startsWith('!VoteKick') && !VoteStarted){
        //person to be kicked
        personToKick = message.guild.member(message.mentions.users.first()); 
        //If i'm the one being kicked
        if(personToKick.id === myID){
            message.reply('You can\' kick my dad');
        //If the bot is the one being kicked
        }else if(personToKick.id === botID){
            message.reply('You must have been thinking how smart you are couple of seconds ago, retard');
        }else if(allowedToBeVotedIDS.includes(personToKick.id)){
            if(!VoteStarted){
                personToKickID = personToKick.id;
                message.reply('Voting started for ' + personToKick.displayName + '\nMinimum Votes needed :5 \n People that are able to vote : Dkay, Hotpants, Retard Chrome, Truva, Trans , Dar , Kendall  and WIck \n For Yes write \'!Vote +\'  and for No write \'!Vote -\'');               
                VoteStarted = true;
            }
        }
        //if VoteKick is in progresse
    }else if(message.content.startsWith('!VoteKick') && VoteStarted){
        message.reply('There is already ongoing VoteKick');
        //**** Voting progeress *
    //To Vote if votekick progress started
    }else if(message.content.startsWith('!Vote') && VoteStarted){
        let msg = message.content.trim();
        //so you cant vote in your own case
        if(message.member.id === personToKickID){
            message.reply('You can\' vote for your case!');
            //so only allowed ones can vote
        }else if(!allowedIDS.includes(message.member.id)){
            message.reply('You are not allowed to vote');
        }
        //counting votes
        else{
            if(msg === '!Vote +'){
                inFavor ++;               
            }else if(msg === '!Vote -'){
                against++;               
            }
            numberOfVotes++;
        }
    //To Vote if votekick progress hasn't started
    }else if(message.content.startsWith("!Vote") && !VoteStarted){
        message.reply('There isn\'t VoteKick progress=');
        //To Show results if votekick progress started
    }else if(message.content.startsWith("!Results") && VoteStarted){
        //So only I can cast a ResultVote
        if(message.member.id === myID){
            if(numberOfVotes >= minNumOfVotes){
                // za > protiv
                if(inFavor > against){
                    message.reply("VoteKick finished! In favor : "+ String(inFavor) + " , Against : " + String(against) + "\n" + personToKick.displayName + "IS ABOUT TO GET KICKED");
                    personToKick.kick("YOU HAVE BEEN VOTED OFF");
                }else if( inFavor == against){
                    message.reply("VoteKick finished! In favor : "+ String(inFavor) + " , Against : " + String(against) + "\n DRAW");
                }else if(inFavor < against){
                    message.reply("VoteKick finished! In favor : "+ String(inFavor) + " , Against : " + String(against) + "\n"+personToKick.displayName + "ISN\'T GETTING KICKED");
                }

            }else{
                message.reply('Not Enough Votes');
            }
            inFavor = 0;
            against = 0;
            numberOfVotes =0;
        }else{
            message.reply('Only Master Wick can request results!');
        }
    //To Show results if voteKick progresss hasnt started
    }else if(message.content.startsWith("!Results") && !VoteStarted){
        message.reply('There isn\'t ongoing VoteKick');
    }

    console.log(message.member.id);

});
// login to Discord with your app's token
client.login('NzI5MzM5MDg5MTM2MTIzOTk1.XwHgRg.BLRHKl1YIn7AX91-yvrNvim3gRg');