import { ApplicationStatus } from "@prisma/client";
import {
  ApplicationCommandOptionType,
  MessageFlags,
} from "discord-api-types/v10";
import type { ChatInputInteraction, Command } from "disploy";
import { UUIDToProfile } from "../../server/lib/minecraft";
import { getSMPUser } from "../../server/lib/utils";
import { EmbedColor } from "../utils/embeds";
import { Emoji } from "../utils/emojis";

const DebugUser: Command = {
  name: "debug-user",
  description: "reset a smp user",
  options: [
    {
      name: "user",
      description: "the user to reset",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "show",
      description: "remove messageflags.ephemeral or not",
      type: ApplicationCommandOptionType.Boolean,
      required: false,
    },
  ],

  async run(interaction: ChatInputInteraction) {
    const user = interaction.options.getUser("user");
    const show = interaction.options.getBoolean("show", true) || false;

    const smpUser = await getSMPUser(user.id).catch(() => null);
    const mcProfile = smpUser?.minecraftUUID
      ? await UUIDToProfile(smpUser.minecraftUUID).catch(() => null)
      : null;

    interaction.reply({
      embeds: [
        {
          title: "Debug User",
          description: [
            "**Identity**",
            `${Emoji.Discord} ${user} [${user.username}#${user.discriminator}] (${user.id})`,
            `${Emoji.Minecraft} ${
              smpUser?.minecraftUUID
                ? `\`${mcProfile?.name ?? "Failed to resolve"}\` (${
                    smpUser.minecraftUUID
                  })`
                : "No linked Minecraft account"
            }`,
            `${Emoji.SafeCloudSMP} ${
              smpUser ? `Resolved SMPU from Discord ${smpUser.id}` : "No"
            }`,
            "",
            `**Application status** ${
              smpUser?.application?.status === ApplicationStatus.PendingReview
                ? "Pending review"
                : "Not pending review"
            }`,
            `${Emoji.SafeCloudSMP} ${
              smpUser?.application?.status === ApplicationStatus.Approved
                ? "Approved"
                : "Not approved"
            }`,
          ].join("\n"),
          color: EmbedColor.Invisible,
        },
      ],
      flags: show ? MessageFlags.Ephemeral : undefined,
    });
  },
};

export default DebugUser;
