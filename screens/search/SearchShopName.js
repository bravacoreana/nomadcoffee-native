import React, { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";
import { SearchMessage } from "../../components/search/Messages";
import CoffeeShop from "../../components/CoffeeShop";
<<<<<<< HEAD
import ScreenLayout from "../../components/ScreenLayout";

export default function SearchShopName({
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
          offset: data?.searchShopName?.length,
        },
      });
  };
=======

export default function SearchShopName({ loading, data, refetch, called }) {
  const [refreshing, setRefreshing] = useState(false);
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

>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderShop = ({ item: shop }) => {
    return <CoffeeShop {...shop} key={shop.id} />;
  };

  return (
    <DismissKeyboard>
<<<<<<< HEAD
      <ScreenLayout>
=======
      <View style={{ flex: 1, backgroundColor: "black" }}>
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
        {loading && <SearchMessage message="Searching" indicator={true} />}
        {!called && (
          <SearchMessage message="Search by keyword!" indicator={false} />
        )}

        {data?.searchShopName !== undefined ? (
          data?.searchShopName.length === 0 ? (
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
              data={data?.searchShopName}
              renderItem={renderShop}
              keyExtractor={(shop) => "" + shop.id}
            />
          )
        ) : null}
<<<<<<< HEAD
      </ScreenLayout>
=======
      </View>
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
    </DismissKeyboard>
  );
}
