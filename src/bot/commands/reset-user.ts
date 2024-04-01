import {
  ApplicationCommandOptionType,
  MessageFlags,
} from "discord-api-types/v10";
import type { ChatInputInteraction, Command } from "disploy";
import { prisma } from "../../server/db/client";
import { updateRoleMeta } from "../../server/lib/discord";
import { getSMPUser } from "../../server/lib/utils";
import { createStatusEmbed } from "../utils/embeds";

const ResetUser: Command = {
  name: "reset-user",
  description: "reset a smp user",
  options: [
    {
      name: "user",
      description: "the user to reset",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],

  async run(interaction: ChatInputInteraction) {
    const user = interaction.options.getUser("user");

    const smpUser = await getSMPUser(user.id);

    if (!smpUser.application) {
      return void interaction.reply({ content: "Application not found." });
    }

    const deletedApplication = await prisma.application
      .delete({
        where: {
          id: smpUser.application.id,
        },
      })
      .then(() => true)
      .catch(() => false);

    const removeLink = await prisma.user
      .update({
        where: {
          id: smpUser.id,
        },
        data: {
          minecraftUUID: null,
          linkChallenge: null,
        },
      })
      .then(() => true)
      .catch(() => false);

    const roleMeta = await updateRoleMeta(smpUser)
      .then(() => true)
      .catch(() => false);

    interaction.reply({
      embeds: [
        createStatusEmbed({
          entity: "User",
          description: `Reset ${user.username}#${user.discriminator}`,
          sideEffects: {
            "Deleted Application": deletedApplication,
            "Removed Link": removeLink,
            "Updated Role Meta": roleMeta,
          },
          success: true,
          actioner: interaction.user,
        }),
      ],
      flags: MessageFlags.Ephemeral,
    });
  },
};

export default ResetUser;
