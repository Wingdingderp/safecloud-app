import type { Account, Application, User } from "@prisma/client";

export type SMPUser = User & {
  application: Application | null;
  accounts: Account[];
};
