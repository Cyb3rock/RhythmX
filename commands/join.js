const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'join',
    description: 'Joins the voice channel and stays 24/7',
    async execute(message, args) {
        if (!message.member.voice.channel) {
            return message.reply("You need to be in a voice channel for me to join!");
        }

        const channel = message.member.voice.channel;

        try {
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

            message.reply(`Joined ${channel.name} and will stay 24/7!`);
            
            // Prevent auto-disconnection
            connection.on('stateChange', (oldState, newState) => {
                if (newState.status === 'disconnected') {
                    joinVoiceChannel({
                        channelId: channel.id,
                        guildId: channel.guild.id,
                        adapterCreator: channel.guild.voiceAdapterCreator,
                    });
                }
            });

        } catch (error) {
            console.error(error);
            message.reply("There was an error connecting to the voice channel.");
        }
    }
};
