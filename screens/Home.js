import React, { useState } from "react";
import styled from "styled-components/native";
import { FlatList, RefreshControl } from "react-native";
import { gql, useQuery } from "@apollo/client";
import ScreenLayout from "../components/ScreenLayout";
import CoffeeShop from "../components/CoffeeShop";

const FEED_QUERY = gql`
  query seeCoffeeShops($page: Int) {
    seeCoffeeShops(page: $page) {
      shops {
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
      shopsCount
      lastPage
    }
  }
`;

const CoffeeShops = styled.View`
  margin-top: 20px;
`;

const Background = styled.Image`
  height: 100%;
  width: 100%;
  position: absolute;
  aspect-ratio: 1;
  opacity: 0.25;
`;

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
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

  const onEndReached = () => {
    if (data?.seeCoffeeShops?.shops && page < data.seeCoffeeShops.lastPage) {
      setPage((prev) => {
        const nextPage = prev + 1;
        fetchMore({
          variables: {
            page: nextPage,
          },
        });
        return nextPage;
      });
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  return (
    <ScreenLayout loading={loading}>
      <Background source={require("../assets/background.jpeg")} />
      <CoffeeShops>
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
          data={data?.seeCoffeeShops?.shops}
          renderItem={renderShop}
          keyExtractor={(shop) => "" + shop.id}
        />
      </CoffeeShops>
    </ScreenLayout>
  );
}
