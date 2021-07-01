import React, { useState } from "react";
import styled from "styled-components/native";
import { FlatList, RefreshControl } from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";
import { SearchMessage } from "../../components/search/Messages";
import { Ionicons } from "@expo/vector-icons";
import ScreenLayout from "../../components/ScreenLayout";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

const IconContainer = styled.View`
  width: 50px;
  height: 50px;
  border: 2px solid rgba(255, 255, 255, 0.13);
  justify-content: center;
  align-items: center;
  border-radius: 25px;
`;

const Avatar = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;

const UsernameText = styled.Text`
  margin-left: 20px;
  font-weight: 600;
  color: white;
  font-size: 16px;
`;

export default function SearchUsers({
  loading,
  data,
  called,
  refetch,
  fetchMore,
}) {
  const [refreshing, setRefreshing] = useState(false);

  const onEndReached = () => {
    if (fetchMore !== undefined)
      fetchMore({
        variables: {
          offset: data?.searchUsers?.length,
        },
      });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderUser = ({ item: user }) => {
    return (
      <Container>
        <IconContainer>
          {user.avatar ? (
            <Avatar source={{ uri: user.avatar }} />
          ) : (
            <Ionicons name="person-outline" color="white" size={30} />
          )}
        </IconContainer>
        <UsernameText>{user.username}</UsernameText>
      </Container>
    );
  };
  return (
    <DismissKeyboard>
      <ScreenLayout>
        {loading && <SearchMessage message="Searching" indicator={true} />}
        {!called && (
          <SearchMessage message="Search by keyword!" indicator={false} />
        )}

        {data?.searchUsers !== undefined ? (
          data?.searchUsers.length === 0 ? (
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
              data={data?.searchUsers}
              renderItem={renderUser}
              keyExtractor={(user) => "" + user.id}
            />
          )
        ) : null}
      </ScreenLayout>
    </DismissKeyboard>
  );
}
