import { MessageFlags } from "discord-api-types/v10";
import type { ChatInputInteraction, Command } from "disploy";

const InDiscordApply: Command = {
  name: "apply",
  description: "Apply for SafeCloudSMP",

  async run(interaction: ChatInputInteraction) {
    interaction.reply({ content: "To apply for the SMP, join the server at safecloud.quest and follow the instructions given to link your account. If you need more help, create a ticket!", flags: MessageFlags.Ephemeral });
  },
};

export default InDiscordApply;
