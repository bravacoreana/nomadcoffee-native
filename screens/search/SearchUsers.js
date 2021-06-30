import React, { useState } from "react";
import styled from "styled-components/native";
import {
  View,
  Text,
  User,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";
import { SearchMessage } from "../../components/search/Messages";
import TabIcon from "../../components/nav/TabIcons";
import ScreenLayout from "../../components/ScreenLayout";

const ProfileContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;
const Avatar = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;
const UsernameText = styled.Text`
  margin-left: 10px;
  font-weight: 600;
  color: white;
`;

export default function SearchUsers({ loading, data, called, refetch }) {
  const [refreshing, setRefreshing] = useState(false);

  const onEndReached = () => {
    if (data?.searchUsers && page < data.searchUsers.lastPage) {
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

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderUser = ({ item: user }) => {
    return (
      <ProfileContainer>
        {user.avatar ? (
          <Avatar source={{ uri: user.avatar }} />
        ) : (
          <TabIcon iconName={"person"} color="white" /> // focused={focused}
        )}
        <UsernameText>{user.username}</UsernameText>
      </ProfileContainer>
    );
  };
  return (
    <DismissKeyboard>
      {/* <View style={{ flex: 1, backgroundColor: "black" }} loading={loading}> */}
      <ScreenLayout loading={loading}>
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
              // onEndReached={onEndReached}
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
