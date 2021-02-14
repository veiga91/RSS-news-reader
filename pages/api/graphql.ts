import { ApolloServer } from "apollo-server-micro";
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from '../../utils/api/typeDefs';
import { resolvers } from '../../utils/api/resolvers';
import Cors from 'micro-cors';
import { applyMiddleware } from "graphql-middleware";
import { log } from "../../utils/log";
import { permissions } from "../../utils/permissions";
import { context } from "../../utils/context";


const cors = Cors();
const schema = applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }), log, permissions) ;

export const config = {
  api: {
    bodyParser: false
  }
};

const handler = new ApolloServer({
  schema,
  context
}).createHandler({
  path: '/api/graphql'
});

export default cors((req, res) => {
  if (req.metohd === 'OPTIONS') {
    return res.status(200).send();
  }

  return handler(req, res)
});
