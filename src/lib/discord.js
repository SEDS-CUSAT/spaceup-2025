import { WebhookClient, EmbedBuilder } from 'discord.js';

/**
 * Sends a Discord webhook with an embed.
 * @param {Object} options
 * @param {string} options.title - The title of the embed.
 * @param {string} options.description - The description of the embed.
 * @param {number|string} [options.color] - The color of the embed (hex or integer).
 * @param {Array<{name: string, value: string, inline?: boolean}>} [options.fields] - Fields to add to the embed.
 * @param {string} [options.footer] - Footer text.
 */
export async function sendDiscordWebhook({ title, description, color, fields, footer }) {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('WEBHOOK_URL is not defined');
    return;
  }

  try {
    const webhookClient = new WebhookClient({ url: webhookUrl });

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(color || 0x0099ff)
      .setTimestamp();

    if (fields) {
      embed.addFields(fields);
    }

    if (footer) {
      embed.setFooter({ text: footer });
    }

    await webhookClient.send({
      username: 'SpaceUp Register Bot',
      avatarURL: 'https://spaceup.sedscusat.com/SpaceUp.jpg',
      embeds: [embed],
    });
  } catch (error) {
    console.error('Error sending Discord webhook:', error);
  }
}
