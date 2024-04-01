import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { chunkUUID, UsernameToProfile } from "../../../server/lib/minecraft";
import { getDiscordUser } from "../../../server/lib/utils";
import adminMiddleware from "../../../utils/adminMiddleware";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ign } = req.query;

  if (typeof ign !== "string") {
    return res.status(400).json({
      error: "Invalid IGN",
    });
  }

  const profile = await UsernameToProfile(ign);

  if (!profile) {
    return res.status(404).json({
      error: "Account not found",
    });
  }

  const uuid = chunkUUID(profile.id);

  const smpAcct = await prisma.user.findFirst({
    where: {
      minecraftUUID: uuid,
    },
    include: {
      accounts: true,
    },
  });

  if (!smpAcct) {
    return res.status(404).json({
      error: "SMP account not found",
    });
  }

  const discord = getDiscordUser(smpAcct.accounts);

  return res.status(200).json({
    minecraftUUID: uuid,
    minecraftUsername: profile.name,
    discordId: discord?.id ?? null,
    smpuId: smpAcct.id,
  });
}

export default adminMiddleware(handler);
