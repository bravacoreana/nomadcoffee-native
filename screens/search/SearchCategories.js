import React from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { View } from "react-native";
import { SHOP_FRAGMENT } from "../../fragments";
import DismissKeyboard from "../../components/DismissKeyboard";
import { SearchMessage } from "../../components/search/Messages";

export default function SearchCategories({ loading, data, refetch, called }) {
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
