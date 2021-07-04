import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { SEE_PROFILE_QUERY } from "../queries";
import useUser from "../hooks/useUser";
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
  background-color: yellow;
  width: 100%;
  flex: 1;
`;

export default function Profile({ navigation, route }) {
  const { data } = useUser(route.params.username);

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
      <BottomColumn></BottomColumn>
    </Container>
  );
}
