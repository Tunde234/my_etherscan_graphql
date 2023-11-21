// Import required modules
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

// Import custom data source for Ethereum
const EtherDataSource = require("./datasource/ethDatasource");

// Import GraphQL schema from file
const typeDefs = importSchema("./schema.graphql");

// Load environment variables from a .env file
require("dotenv").config();

// Define resolvers for GraphQL queries
const resolvers = {
  Query: {
    // Resolver for fetching ether balance by address
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Resolver for fetching total ether supply
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Resolver for fetching the latest ether price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Resolver for fetching block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Set server timeout to 0 to disable automatic timeouts
server.timeout = 0;

// Start the Apollo Server on port 9000
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
