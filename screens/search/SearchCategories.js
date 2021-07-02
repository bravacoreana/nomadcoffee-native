<<<<<<< HEAD
import React, { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";
import { SearchMessage } from "../../components/search/Messages";
import CoffeeShop from "../../components/CoffeeShop";
import ScreenLayout from "../../components/ScreenLayout";
import styled from "styled-components/native";

const Container = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const IconContainer = styled.View`
  border: 2px solid rgba(255, 255, 255, 0.13);
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  margin-right: 20px;
`;
const IconText = styled.Text`
  color: white;
  font-size: 30px;
  font-style: italic;
`;
const Text = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

export default function SearchCategories({
  loading,
  data,
  refetch,
  called,
  fetchMore,
}) {
  const [refreshing, setRefreshing] = useState(false);

  const onEndReached = () => {
    if (fetchMore !== undefined)
      fetchMore({
        variables: {
          offset: data?.searchCategories?.length,
        },
      });
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderCategories = ({ item: categories }) => {
    return (
      <Container>
        {/* <Ionicons name="checkmark-circle-outline" color="white" size={40} /> */}
        <IconContainer>
          <IconText>#</IconText>
        </IconContainer>
        <Text>#{categories.slug}</Text>
      </Container>
    );
  };

  return (
    <DismissKeyboard>
      <ScreenLayout>
=======
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
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
        {loading && <SearchMessage message="Searching" indicator={true} />}
        {!called && (
          <SearchMessage message="Search by keyword!" indicator={false} />
        )}
<<<<<<< HEAD

        {data?.searchCategories !== undefined ? (
          data?.searchCategories.length === 0 ? (
            <SearchMessage message="No data!" indicator={false} />
          ) : (
            <FlatList
              style={{ width: "100%" }}
              onEndReachedThreshold={0.05}
              onEndReached={onEndReached}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="white"
                />
              }
              showsVerticalScrollIndicator={false}
              data={data?.searchCategories}
              renderItem={renderCategories}
              keyExtractor={(shop) => "" + shop.id}
            />
          )
        ) : null}
      </ScreenLayout>
=======
      </View>
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
    </DismissKeyboard>
  );
}
