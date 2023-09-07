import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://challenge-studio.ir/graphql',
  cache: new InMemoryCache(),
});

export default client;
