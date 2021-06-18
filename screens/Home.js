import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, RefreshControl, Text, View } from "react-native";
import { gql, useQuery } from "@apollo/client";
import CoffeeShop from "../components/CoffeeShop";
import ScreenLayout from "../components/ScreenLayout";
// import CoffeeShops from "../components/CoffeeShops";

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

export default function Home({ route }) {
  const { data, loading } = useQuery(FEED_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });

  const [refreshing, setRefreshing] = useState();
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout>
      <Text style={{ color: "white" }}>Coffee shop</Text>
    </ScreenLayout>
    // <ScreenLayout loading={loading}>
    //   <ScrollView
    //     refreshControl={
    //       <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
    //     }
    //     style={{ backgroundColor: "black" }}
    //     contentContainerStyle={{
    //       backgroundColor: "black",
    //       alignItems: "center",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <CoffeeShops>
    //       {!loading
    //         ? data?.seeCoffeeShops?.map((shop) => (
    //             <CoffeeShop key={"" + shop.id + Math.random()} {...shop} />
    //           ))
    //         : null}
    //     </CoffeeShops>
    //   </ScrollView>
    // </ScreenLayout>
  );
}
