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
