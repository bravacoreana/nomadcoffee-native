import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";
import { offsetLimitPagination } from "@apollo/client/utilities";
// import { offsetLimitPagination } from "@apollo/client/utilities";

const TOKEN = "token";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar("");
};

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) console.log(`[GraphQL Error]`, graphQLErrors);
  if (networkError) console.log("[Network Error]", networkError);
});

const uploadHttpLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

// const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeCoffeeShops: {
          keyArgs: false,
          merge(existing = [], incoming = []) {
            return [...existing, ...incoming];
          },
        },

        searchCoffeeShop: offsetLimitPagination(),
        searchShopName: offsetLimitPagination(),
        searchCategories: offsetLimitPagination(),
        searchUsers: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  cache,
});

export default client;

// updateQuery: (previousResult, { fetchMoreResult }) => {
//   if (!fetchMoreResult) return previousResult;
//   return Object.assign({}, previousResult, {
//     posts: {
//       ...previousResult.posts,
//       post: [...previousResult.posts.post, ...fetchMoreResult.posts.post]
//     }
//   });
// }

// seeCoffeeShops: offsetLimitPagination(),
// seeCoffeeShops: {
//   keyArgs: false,
//   merge(existing = {}, incoming = {}) {
//     return {
//       ...incoming,
//       shops: [...(existing.shops || []), ...incoming.shops],
//     };
//   },
// },
