import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'https://47ty9867af.execute-api.us-west-2.amazonaws.com/dev/graphql'
});

export default client;
