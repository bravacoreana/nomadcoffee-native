import React from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { View } from "react-native";
import styled from "styled-components/native";

import { SHOP_FRAGMENT } from "../../fragments";
import DismissKeyboard from "../../components/DismissKeyboard";
import { SearchMessage } from "../../components/search/Messages";

const SEARCH_SHOPS = gql`
  query searchCoffeeShop($keyword: String!) {
    searchCoffeeShop(keyword: $keyword) {
      ...ShopFragment
    }
  }
  ${SHOP_FRAGMENT}
`;

export default function SearchShops({ navigation }) {
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_SHOPS);

  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading && <SearchMessage message="Searching" indicator={true} />}
        {!called && (
          <SearchMessage message="Search by keyword!" indicator={false} />
        )}
      </View>
    </DismissKeyboard>
  );
}
