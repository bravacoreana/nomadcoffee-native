import React, { useState } from "react";
import styled from "styled-components/native";
<<<<<<< HEAD
import { FlatList, RefreshControl } from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";
import { SearchMessage } from "../../components/search/Messages";
import { Ionicons } from "@expo/vector-icons";
import ScreenLayout from "../../components/ScreenLayout";

const Container = styled.TouchableOpacity`
=======
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
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;
<<<<<<< HEAD

const IconContainer = styled.View`
  width: 50px;
  height: 50px;
  border: 2px solid rgba(255, 255, 255, 0.13);
  justify-content: center;
  align-items: center;
  border-radius: 25px;
`;

=======
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
const Avatar = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;
<<<<<<< HEAD

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
=======
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
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderUser = ({ item: user }) => {
    return (
<<<<<<< HEAD
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
=======
      <ProfileContainer>
        {user.avatar ? (
          <Avatar source={{ uri: user.avatar }} />
        ) : (
          <TabIcon iconName={"person"} color="white" /> // focused={focused}
        )}
        <UsernameText>{user.username}</UsernameText>
      </ProfileContainer>
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
    );
  };
  return (
    <DismissKeyboard>
<<<<<<< HEAD
      <ScreenLayout>
=======
      {/* <View style={{ flex: 1, backgroundColor: "black" }} loading={loading}> */}
      <ScreenLayout loading={loading}>
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
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
<<<<<<< HEAD
              onEndReached={onEndReached}
=======
              // onEndReached={onEndReached}
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
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
