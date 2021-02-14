

export const resolvers = {
  Query: {
    hello: (parent, args, context) => {
      return 'hi!'
    },
    feed: (parent, {data: { id }}, { prisma }) => {
      return prisma.feed.findUnique({ where: { id }})
    },

    feeds: (parent, args, { prisma }) => prisma.feed.findMany(),
    bundle: (parent, {data: { id }}, { prisma }) => {
      return prisma.bundle.findUnique({ where: { id }})
    },

    bundles: (parent, args, { prisma }) => prisma.bundle.findMany()
  },
  Mutation: {
    createFeed: async (parent, {data}, { prisma }) => {
      const result = prisma.feed.create({ data: {...data}});

      return result;
    },
    createBundle: async (parent, {data}, { prisma }) => {
      const result = prisma.bundle.create({ data: {...data}});

      return result;
    }
  }
}