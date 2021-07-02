import React, { useState } from "react";
import styled from "styled-components/native";
import { FlatList, RefreshControl } from "react-native";
import { gql, useQuery } from "@apollo/client";
import ScreenLayout from "../components/ScreenLayout";
import CoffeeShop from "../components/CoffeeShop";
<<<<<<< HEAD
import { SEE_COFFEESHOPS_QUERY } from "../queries";
=======
import { FEED_QUERY } from "../queries";
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9

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
  // const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(
    SEE_COFFEESHOPS_QUERY,
    {
      variables: {
        offset: 0,
      },
    }
  );

  const renderShop = ({ item: shop }) => {
    return <CoffeeShop {...shop} key={shop.id} />;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch({
      offset: 0,
    });
    setRefreshing(false);
  };

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
      </CoffeeShops>
    </ScreenLayout>
  );
}
// export default function Home() {
//   const [page, setPage] = useState(1);
//   const [refreshing, setRefreshing] = useState(false);
//   const { data, loading, refetch, fetchMore } = useQuery(
//     SEE_COFFEESHOPS_QUERY,
//     {
//       variables: {
//         page: 1,
//       },
//     }
//   );

//   const renderShop = ({ item: shop }) => {
//     return <CoffeeShop {...shop} key={shop.id} />;
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await refetch();
//     setRefreshing(false);
//   };

//   const onEndReached = () => {
//     if (page < data.seeCoffeeShops.lastPage) {
//       setPage((prev) => {
//         const nextPage = prev + 1;
//         fetchMore({
//           variables: {
//             page: nextPage,
//           },
//         });
//         return nextPage;
//       });
//     }
//   };

//   return (
//     <ScreenLayout loading={loading}>
//       <Background source={require("../assets/background.jpeg")} />
//       <CoffeeShops>
//         <FlatList
//           style={{ width: "100%" }}
//           onEndReachedThreshold={0.05}
//           onEndReached={onEndReached}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               tintColor="white"
//             />
//           }
//           showsVerticalScrollIndicator={false}
//           data={data?.seeCoffeeShops?.shops}
//           renderItem={renderShop}
//           keyExtractor={(shop) => "" + shop.id}
//         />
//       </CoffeeShops>
//     </ScreenLayout>
//   );
// }
