const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");
const musicIcons = require('../UI/icons/musicicons.js');

module.exports = {
    name: "support",
    description: "Get support server link",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction, lang) => {
        try {
            const supportServerLink = "https://discord.gg/6PvK2Pb696";
            const instagramLink = "https://www.instagram.com/abhishek.designs_/";
            const youtubeLink = "https://www.youtube.com/@abhishekdesigns-02";

            const embed = new EmbedBuilder()
                .setColor('#b300ff')
                .setAuthor({
                    name: lang.support.embed.authorName,
                    iconURL: musicIcons.beats2Icon, 
                    url: config.SupportServer
                })
                .setDescription(lang.support.embed.description
                    .replace("{supportServerLink}", supportServerLink)
                    .replace("{instagramLink}", githubLink)
                    .replace("{youtubeLink}", youtubeLink)
                )
                .setImage('https://cdn.discordapp.com/attachments/1336336922246778964/1336343201715327078/11_1.png?ex=67a37617&is=67a22497&hm=443e600c07153b09af3be8db14b5c2923d5faa64a2a7b93f0beec7cb199a548c&')
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (e) {
            console.error(e);
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({
                    name: lang.support.embed.error,
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setDescription(lang.support.embed.errorDescription)
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon });

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};
