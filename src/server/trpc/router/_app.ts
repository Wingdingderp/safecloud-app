import { router } from "../trpc";
import { adminRouter } from "./admin";
import { authRouter } from "./auth";
import { blogRouter } from "./blog";
import { discordRouter } from "./discord";
import { metaRouter } from "./meta";

export const appRouter = router({
  auth: authRouter,
  discord: discordRouter,
  admin: adminRouter,
  meta: metaRouter,
  blog: blogRouter,
});

export type AppRouter = typeof appRouter;
