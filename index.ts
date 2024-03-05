import Server from './src/server';
import { typeDefs } from './src/schemas/rootSchema';
import { rootResolver } from './src/resolvers/rootResolver';


(async function main() {
  try {
    await Server(typeDefs, rootResolver);
    console.log('Connection has been established successfully.');
  } catch (error: any) {
    console.log({ error: error.message });
  }
})();