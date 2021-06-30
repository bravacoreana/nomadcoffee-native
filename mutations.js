import { gql } from "@apollo/client";

export const CREATE_COFFEESHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $photos: [Upload]
    $caption: String
    $categories: [String]
    $latitude: String!
    $longitude: String!
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      photos: $photos
      caption: $caption
      categories: $categories
    ) {
      ok
      error
    }
  }
`;
