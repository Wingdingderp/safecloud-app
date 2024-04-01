import { z } from "zod";
import type { SMPUser } from "../../../types/users";
import { UUIDToProfile } from "../../lib/minecraft";
import { playerMemberProcedure, publicProcedure, router } from "../trpc";

export interface ISMPUser {
  minecraftUUID: string | null;
  minecraftName: string | null;
  id: string;
  name: string | null;
  image: string | null;
}

export interface ISMPLocalUser extends ISMPUser {
  isBotAdmin: boolean;
  canAccessAdminDashboard: boolean;
}

export const authRouter = router({
  getLocalUser: playerMemberProcedure.query(async ({ ctx: { user } }) => {
    const localUser = await createLocalUserModel(user);

    return localUser;
  }),
  getUser: publicProcedure
    .input(
      z.object({
        skip: z.number().default(0),
        take: z.number(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { skip, take } }) => {
      const dbUsers = await prisma.user.findMany({
        skip,
        take,
      });

      const users: ISMPUser[] = await Promise.all(
        dbUsers.map(async (user) => ({
          minecraftUUID: user.minecraftUUID,
          minecraftName: user.minecraftUUID
            ? (
                await UUIDToProfile(user.minecraftUUID)
              ).name
            : null,
          id: user.id,
          name: user.name,
          image: user.image,
        }))
      );

      return users;
    }),
});

export async function createLocalUserModel(
  user: SMPUser
): Promise<ISMPLocalUser> {
  return {
    minecraftUUID: user.minecraftUUID,
    minecraftName: user.minecraftUUID
      ? (await UUIDToProfile(user.minecraftUUID)).name
      : null,
    id: user.id,
    name: user.name,
    image: user.image,
    isBotAdmin: user.isBotAdmin,
    canAccessAdminDashboard: user.canAccessAdminDashboard,
  };
}
