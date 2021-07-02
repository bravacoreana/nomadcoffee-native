import gql from "graphql-tag";

export const CREATE_SHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $photos: [Upload]
    $caption: String
    $categories: [String]
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
