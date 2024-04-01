import { router } from "../trpc";
import { adminRouter } from "./admin";
import { authRouter } from "./auth";
import { blogRouter } from "./blog";
import { discordRouter } from "./discord";
import { metaRouter } from "./meta";
import { onboardingRouter } from "./onboarding";

export const appRouter = router({
  auth: authRouter,
  onboarding: onboardingRouter,
  discord: discordRouter,
  admin: adminRouter,
  meta: metaRouter,
  blog: blogRouter,
});

export type AppRouter = typeof appRouter;
