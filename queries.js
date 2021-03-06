import gql from "graphql-tag";
import { FEED_FRAGMENT, SHOP_FRAGMENT } from "./fragments";

export const SEE_COFFEESHOPS_QUERY = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      ...FeedFragment
    }
  }
  ${FEED_FRAGMENT}
`;

export const SEARCH_GENERAL = gql`
  query searchCoffeeShop($keyword: String!) {
    searchCoffeeShop(keyword: $keyword) {
      ...ShopFragment
    }
  }
  ${SHOP_FRAGMENT}
`;

export const SEARCH_SHOPNAME = gql`
  query searchShopName($keyword: String!) {
    searchShopName(keyword: $keyword) {
      ...ShopFragment
    }
  }
  ${SHOP_FRAGMENT}
`;

export const SEARCH_CATEGORIES = gql`
  query searchCategories($keyword: String!) {
    searchCategories(keyword: $keyword) {
      id
      slug
      # totalShops
    }
  }
`;

export const SEARCH_USER = gql`
  query searchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
      id
      username
      avatar
      # following
      # followers
    }
  }
`;

export const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      username
      name
      location
      avatar
      bio
      email
      isMe
      # githubUsername
      # isFollowing
      shops {
        ...ShopFragment
      }
    }
  }
  ${SHOP_FRAGMENT}
`;
