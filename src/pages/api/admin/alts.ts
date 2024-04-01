import { ApplicationStatus } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "../../../server/db/client";
import { syncUser } from "../../../server/lib/linking";
import { getTSMPUser } from "../../../server/lib/utils";
import adminMiddleware from "../../../utils/adminMiddleware";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const discordId =
    req.method === "GET"
      ? z.string().parse(req.query.discordId as string)
      : z.string().parse(req.body.discordId);

  const user = await getTSMPUser(discordId).catch(() => null);

  if (!user) {
    res.status(404).json({
      error: "user not found",
    });
    return;
  }

  if (
    !user.minecraftUUID ||
    user.application?.status !== ApplicationStatus.Approved
  ) {
    res.status(404).json({
      error: "user not eligible for alts",
    });
    return;
  }

  switch (req.method) {
    case "GET": {
      res.status(200).json({
        alts: user.minecraftAlternativeAccounts.map((alt) => alt.minecraftUUID),
      });
      break;
    }
    case "POST": {
      const json = z
        .object({
          alt: z.string(), // UUID
        })
        .passthrough()
        .parse(req.body);

      const newAlt = await prisma.minecraftAlternativeAccount.create({
        data: {
          minecraftUUID: json.alt,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      await syncUser({
        ...user,
        minecraftAlternativeAccounts: [
          ...user.minecraftAlternativeAccounts,
          newAlt,
        ],
      });

      res.status(200).json({
        alts: user.minecraftAlternativeAccounts
          .map((alt) => alt.minecraftUUID)
          .concat(json.alt),
      });
      break;
    }
    case "DELETE": {
      const json = z
        .object({
          alt: z.string(), // UUID
        })
        .passthrough()
        .parse(req.body);

      await prisma.minecraftAlternativeAccount.delete({
        where: {
          userId_minecraftUUID: {
            userId: user.id,

            minecraftUUID: json.alt,
          },
        },
      });

      await syncUser({
        ...user,
        minecraftAlternativeAccounts: user.minecraftAlternativeAccounts.filter(
          (alt) => alt.minecraftUUID !== json.alt
        ),
      });

      res.status(200).json({
        alts: user.minecraftAlternativeAccounts
          .map((alt) => alt.minecraftUUID)
          .filter((alt) => alt !== json.alt),
      });
      break;
    }
    default: {
      res.status(405).json({
        error: "method not allowed",
      });
      break;
    }
  }
}

export default adminMiddleware(handler);
