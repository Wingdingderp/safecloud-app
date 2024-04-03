import { MessageFlags } from "discord-api-types/v10";
import type { ChatInputInteraction, Command } from "disploy";
import { prisma } from "../../server/db/client";
import { generateLinkChallenge } from "../../server/lib/linking";

const InDiscordApply: Command = {
  name: "apply",
  description: "How to apply for SafeCloudSMP",

  async run(interaction: ChatInputInteraction) {
    interaction.reply({ content: "To apply for the SMP, join the server at safecloud.quest and follow the instructions given to link your account. If you need more help, create a ticket!", flags: MessageFlags.Ephemeral });
  },
};

export default InDiscordApply;
