import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://cms.challenge-studio.ir/graphql',
  cache: new InMemoryCache(),
});

export default client;
