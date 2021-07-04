import React, { useState } from "react";
import styled from "styled-components/native";
import { FlatList, RefreshControl } from "react-native";
import { useQuery } from "@apollo/client";
import ScreenLayout from "../components/ScreenLayout";
import CoffeeShop from "../components/CoffeeShop";
import { SEE_COFFEESHOPS_QUERY } from "../queries";

const Background = styled.Image`
  height: 100%;
  width: 100%;
  position: absolute;
  aspect-ratio: 1;
  opacity: 0.25;
`;

export default function Home() {
  const { data, loading, refetch, fetchMore } = useQuery(
    SEE_COFFEESHOPS_QUERY,
    {
      variables: {
        offset: 0,
      },
    }
  );

  const renderShop = ({ item: shop }) => {
    return <CoffeeShop {...shop} key={"" + shop.id} />;
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
      <FlatList
        style={{ width: "100%" }}
        onEndReachedThreshold={0.05}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeCoffeeShops?.length,
            },
          })
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="white"
          />
        }
        showsVerticalScrollIndicator={false}
        data={data?.seeCoffeeShops}
        renderItem={renderShop}
        keyExtractor={(shop) => "" + shop.id}
      />
    </ScreenLayout>
  );
}
