import { ApolloServer } from "apollo-server-micro";
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from '../../utils/api/typeDefs';
import { resolvers } from '../../utils/api/resolvers';
import Cors from 'micro-cors';


const cors = Cors();
const schema = makeExecutableSchema({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false
  }
};

const handler = new ApolloServer({
  schema
}).createHandler({
  path: '/api/graphql'
});

export default cors((req, res) => {
  if (req.metohd === 'OPTIONS') {
    return res.status(200).send();
  }

  return handler(req, res)
});
