import { gql } from "@apollo/client";

export const SHOP_FRAGMENT = gql`
  fragment ShopFragment on CoffeeShop {
    id
    name
    latitude
    longitude
    isMine
    photos {
      url
    }
    categories {
      name
    }
    createdAt
  }
`;

export const FEED_FRAGMENT = gql`
  fragment FeedFragment on CoffeeShop {
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
`;

// export const SHOPS_FRAGMENT = gql`
//   fragment ShopsFragment on CoffeeShop {
//     id
//     name
//     latitude
//     longitude
//     isMine
//     isLiked
//   }
// `;

// export const USER_FRAGMENT = gql`
// fragment UserFragment on User {
//   id
//   username
//   avatar
// }
// `;
