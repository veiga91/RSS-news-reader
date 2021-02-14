

export const resolvers = {
  Query: {
    hello: (parent, args, context) => {
      return 'hi!'
    }
  }
}