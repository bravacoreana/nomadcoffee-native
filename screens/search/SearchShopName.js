import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { View, ActivityIndicator, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { SHOP_FRAGMENT } from "../../fragments";
import DismissKeyboard from "../../components/DismissKeyboard";
import CoffeeShop from "../../components/CoffeeShop";
// import CoffeeShop from "../../components/CoffeeShop";

const SEARCH_SHOPS = gql`
  query searchCoffeeShop($keyword: String!) {
    searchCoffeeShop(keyword: $keyword) {
      ...ShopFragment
    }
  }
  ${SHOP_FRAGMENT}
`;

const Input = styled.TextInput`
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.3);
  width: ${(props) => props.width / 1.2}px;
  padding: 10px;
  color: white;
  border-radius: 20px;
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 20px;
`;

const ResultContainer = styled.View`
  margin-top: 20px;
`;

export default function SearchShopName({ navigation }) {
  const { width } = useWindowDimensions();
  const { register, setValue, watch, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_SHOPS);

  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };

  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="rgba(255,255,255,0.5)"
      placeholder="Search"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: "true",
    });
  }, []);
  const renderItem = ({ item: coffeeShop }) => <CoffeeShop {...coffeeShop} />;

  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchCoffeeShop !== undefined ? (
          data?.searchCoffeeShop?.length === 0 ? (
            <MessageContainer>
              <MessageText>No data</MessageText>
            </MessageContainer>
          ) : (
            <ResultContainer>
              <FlatList
                data={data?.searchCoffeeShop}
                keyExtractor={(coffeeShop) => coffeeShop.id}
                renderItem={renderItem}
              />
            </ResultContainer>
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
