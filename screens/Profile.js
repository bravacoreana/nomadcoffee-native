import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { SEE_COFFEESHOPS_QUERY, SEE_PROFILE_QUERY } from "../queries";
import useUser from "../hooks/useUser";
import CoffeeShop from "../components/CoffeeShop";
const Container = styled.View`
  background-color: #000;
  flex: 1;
  align-items: center;
`;

const UserContainer = styled.View`
  height: 30%;
  padding: 10px 10px;
  width: 100%;
  padding-top: 30px;
`;
const TopColumn = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-around;
`;
const AvatarContainer = styled.View`
  border: 2px solid rgba(255, 255, 255, 0.3);
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;
const Avatar = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  margin-bottom: 10px;
`;
const Bio = styled.Text`
  margin-top: 20px;
  color: white;
`;
const BioNull = styled.Text`
  color: rgba(255, 255, 255, 0.3);
`;
const UserDetailColumn = styled.View``;
const DetailContainer = styled.View``;
const DetailColumn = styled.View`
  flex-direction: row;
  padding: 0px 10px;
`;
const DetailTitle = styled.Text`
  color: white;
  text-align: left;
  width: 80px;
`;
const Detail = styled.Text`
  color: white;
  text-align: left;
  margin-left: 7px;
`;

const BioColumn = styled.View`
  width: 100%;
`;

const BottomColumn = styled.View`
  width: 100%;
  flex: 1;
`;

export default function Profile({ navigation, route }) {
  const { data } = useUser(route.params.username);

  // FlatList //

  // const {
  //   data: userShopData,
  //   loading,
  //   refetch,
  //   fetchMore,
  // } = useQuery(SEE_COFFEESHOPS_QUERY, {
  //   variables: {
  //     offset: 0,
  //   },
  // });

  // const renderUserShop = ({ item: shop }) => {
  //   return <CoffeeShop {...shop} key={"" + shop.id} />;
  // };

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   await refetch();
  //   setRefreshing(false);
  // };

  // const [refreshing, setRefreshing] = useState(false);

  // FlatList End //

  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route.params.username,
      });
    }
  }, []);

  return (
    <Container>
      <UserContainer>
        <TopColumn>
          <AvatarContainer>
            <Avatar source={{ uri: data?.seeProfile?.avatar }} />
          </AvatarContainer>
          <UserDetailColumn>
            <DetailContainer>
              <DetailColumn>
                <DetailTitle>NAME</DetailTitle>
                <Detail>{data?.seeProfile?.name}</Detail>
              </DetailColumn>
              <DetailColumn>
                <DetailTitle>USERNAME</DetailTitle>
                <Detail>{data?.seeProfile?.username}</Detail>
              </DetailColumn>
            </DetailContainer>
          </UserDetailColumn>
        </TopColumn>
        <BioColumn>
          {data?.seeProfile?.bio ? (
            <Bio>{data?.seeProfile?.bio}</Bio>
          ) : (
            <BioNull>no bio</BioNull>
          )}
        </BioColumn>
      </UserContainer>
      <BottomColumn>
        {/* <FlatList
          style={{ width: "100%" }}
          onEndReachedThreshold={0.05}
          onEndReached={() =>
            fetchMore({
              variables: {
                offset: data?.seeProfile?.shops?.length,
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
          data={data?.seeProfile?.shops}
          renderItem={renderUserShop}
          keyExtractor={(shop) => "" + shop.id}
        /> */}
        {data?.seeProfile?.shops.map((shop, index) => (
          <CoffeeShop {...shop} key={"" + shop.id + index} />
        ))}
      </BottomColumn>
    </Container>
  );
}
