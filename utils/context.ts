import { PrismaClient } from "@prisma/client";
import auth0 from "./auth0";
import {v4 as uuidV4 } from 'uuid';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();

} else {
  globalThis['prisma'] = globalThis['prisma'] || new PrismaClient();
  prisma = globalThis['prisma'];
}

export const context = async ({req}) => {
  try {
    //const { user: auth0User } = await auth0.getSession(req);
    const auth0User = { nickname: "Fake", sub: "0", picture: "/blank.png"};
    let user = prisma.user.findUnique({ where:{ auth0: auth0User.sub }});

    if (!user) {
      const { picture, nickname, sub } = auth0User;
      user = prisma.user.create({ data: { id: uuidV4(), auth0: sub, nickname, picture }});
    }

    return { user, prisma };
  } catch(e) {
    console.log(e)
    return { user: {}, prisma };
  }
 }