import 'reflect-metadata'

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import path from "node:path";
import { buildSchema } from "type-graphql";
import { RecipeResolver } from './graphql/resolvers/recipe-resolver';
import { UserResolver }from  './graphql/resolvers/user-resolver';
import { CustomAuthChecker } from './graphql/guards/authenticated-guard';
import { container } from './container/container';
import { IngredientsResolver } from './graphql/resolvers/ingredients-resolver';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [RecipeResolver, UserResolver, IngredientsResolver],
    emitSchemaFile: path.join(__dirname, '/graphql/schema.graphql'),
    container: ({context}) => container,
    authChecker: CustomAuthChecker
  })

  const server = new ApolloServer({
     schema,
    })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const token = req.headers.authorization || ""
      return { token }
    }
  })
  console.log(`🚀 Graphql server ready at ${url}`)
}

bootstrap()