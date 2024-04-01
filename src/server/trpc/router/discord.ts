import { TRPCError } from "@trpc/server";
import { DisployApp } from "../../../bot/main";
import { env } from "../../../env/server.mjs";
import { protectedProcedure, router } from "../trpc";

export const discordRouter = router({
  deployBotCommands: protectedProcedure.mutation(async ({ ctx: { user } }) => {
    if (!user.isBotAdmin) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not a bot admin",
      });
    }

    await DisployApp.commands.syncCommands(false, env.DISCORD_GUILD_ID);

    return true;
  }),
});
