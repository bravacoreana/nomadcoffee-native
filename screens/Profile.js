import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { logUserOut } from "../apollo";
import useMe from "../hooks/useMe";
// import useUser from "../hooks/useUser";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      username
      name
      location
      avatar
      bio
      # githubUsername
      isMe
      # following
      # followers
    }
  }
`;

const ProfileContainer = styled.View`
  background-color: black;
  flex: 1;
  align-items: center;
  /* justify-content: center; */
`;

const UserProfile = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #b09f7d;
  padding: 120px 0px;
`;

const Detail = styled.View`
  align-items: center;
`;

const Avatar = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  margin-bottom: 10px;
`;

const Content = styled.Text`
  color: white;
`;

const ContentTitle = styled.Text`
  color: white;
  text-align: left;
  /* width: 50%; */
`;

const Buttons = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const Button = styled.Text`
  color: white;
  padding: 7px 10px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  width: 100%;
  margin-left: 5px;
  width: 100px;
  text-align: center;
`;

const DetailContainer = styled.View`
  width: 100%;
  justify-content: space-around;
  background-color: #a57d45;
  flex: 1;
`;
const InfoBox = styled.View`
  width: 100%;
  padding: 10px;
  background-color: #a57d45;
  margin-left: 20px;
`;

const Info = styled.Text`
  /* width: 50%; */
  color: white;
  text-align: left;
  font-size: 20px;
  margin-left: 7px;
`;

export default function Profile({ navigation, route }) {
  const { data } = useMe();

  const { data: QueryData } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username: data?.me?.username,
    },
  });

  console.log(QueryData);

  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
    });
  }, []);

  return (
    <ProfileContainer>
      {data?.me ? (
        <UserProfile>
          <Detail>
            <Avatar source={{ uri: data.me.avatar }} />
            <Content>
              {QueryData?.seeProfile?.bio ? QueryData?.seeProfile?.bio : null}
            </Content>
          </Detail>
          <Buttons>
            <TouchableOpacity>
              <Button>Edit Profile</Button>
            </TouchableOpacity>
            <TouchableOpacity onPress={logUserOut}>
              <Button>Log out</Button>
            </TouchableOpacity>
          </Buttons>
        </UserProfile>
      ) : null}
      <DetailContainer>
        <InfoBox>
          <ContentTitle>USERNAME</ContentTitle>
          <Info>{QueryData?.seeProfile?.username}</Info>
        </InfoBox>
        <InfoBox>
          <ContentTitle>NAME</ContentTitle>
          <Info>{QueryData?.seeProfile?.name}</Info>
        </InfoBox>
        <InfoBox>
          <ContentTitle>LOCATION</ContentTitle>
          <Info>{QueryData?.seeProfile?.location}</Info>
        </InfoBox>
        <InfoBox>
          <ContentTitle>BIO</ContentTitle>
          <Info>{QueryData?.seeProfile?.bio}</Info>
        </InfoBox>
      </DetailContainer>
    </ProfileContainer>
  );
}
