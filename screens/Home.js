import React, { useState } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { gql, useQuery } from "@apollo/client";
import ScreenLayout from "../components/ScreenLayout";
import CoffeeShop from "../components/CoffeeShop";

const FEED_QUERY = gql`
  query seeCoffeeShops($page: Int) {
    seeCoffeeShops(page: $page) {
      id
      name
      latitude
      longitude
      user {
        username
        avatar
      }
      categories {
        id
        name
      }
      photos {
        id
        url
      }
      isMine
    }
  }
`;

const CoffeeShops = styled.View``;
const Background = styled.Image`
  height: 100%;
  width: 100%;
  position: absolute;
  aspect-ratio: 1;
  opacity: 0.25;
`;

export default function Home({ route }) {
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      id: route?.params?.id,
      page: 1,
    },
  });

  const renderShop = ({ item: shop }) => {
    return <CoffeeShop {...shop} key={shop.id} />;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const [refreshing, setRefreshing] = useState(false);

  return (
    <ScreenLayout loading={loading}>
      <Background source={require("../assets/background.jpeg")} />
      <CoffeeShops>
        <FlatList
          style={{ width: "100%" }}
          onEndReachedThreshold={0.05}
          onEndReached={() =>
            fetchMore({
              variables: {
                page: data?.seeCoffeeShops?.length / 6 + 1,
              },
            })
          }
          refreshing={refreshing}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          data={data?.seeCoffeeShops}
          renderItem={renderShop}
          keyExtractor={(shop) => "" + shop.id}
        />
      </CoffeeShops>
    </ScreenLayout>
  );
}
