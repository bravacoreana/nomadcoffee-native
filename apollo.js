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
<<<<<<< HEAD
import { offsetLimitPagination } from "@apollo/client/utilities";
=======
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
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
<<<<<<< HEAD
  if (graphQLErrors) console.log(`[GraphQL Error]`, graphQLErrors);
  if (networkError) console.log("[Network Error]", networkError);
=======
  if (graphQLErrors) {
    console.log(`[GraphQL Error]`, graphQLErrors);
  }
  if (networkError) {
    console.log("[Network Error]", networkError);
  }
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
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

<<<<<<< HEAD
// const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);
=======
const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9

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
<<<<<<< HEAD
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
=======
  link: authLink.concat(httpLinks),
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
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
