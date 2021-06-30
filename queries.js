import gql from "graphql-tag";
import { SHOP_FRAGMENT } from "./fragments";

export const FEED_QUERY = gql`
  query seeCoffeeShops($page: Int) {
    seeCoffeeShops(page: $page) {
      shops {
        id
        name
        latitude
        longitude
        user {
          username
          avatar
        }
        caption
        categories {
          id
          name
        }
        photos {
          id
          url
        }
        likes
        isLiked
        isMine
      }
      shopsCount
      lastPage
    }
  }
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
      ...ShopFragment
    }
  }
  ${SHOP_FRAGMENT}
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
