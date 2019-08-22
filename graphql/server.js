'use strict';

/* eslint-disable import/no-extraneous-dependencies */

const requireGraphQLFile = require('require-graphql-file');
const { gql, ApolloServer } = require('apollo-server');

const typeDefs = requireGraphQLFile('./schemas/ais-service-backend-service-schema');
const examples = require('./examples');

const port = process.env.PORT || 4444;
const endpoint = `http://localhost:${port}/graphql`;

// Mocks the @aws_subscribe annotation
const schema = gql`
  directive @aws_subscribe(mutations: [String]) on FIELD_DEFINITION
  ${typeDefs}
`;

const serve = (resolvers) => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    playground: {
      settings: {},
      tabs: examples.map(({ name, query }) => ({
        endpoint,
        query,
        name,
      })),
    },
  });

  server.listen(port).then(({ url }) => {
    console.log(`🔥 Server ready at: \n ${url} 💥`);
  });
};

module.exports = serve;
