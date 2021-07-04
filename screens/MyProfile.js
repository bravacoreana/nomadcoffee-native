import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { logUserOut } from "../apollo";
import useMe from "../hooks/useMe";
import { SEE_PROFILE_QUERY } from "../queries";
// import useUser from "../hooks/useUser";

const ProfileContainer = styled.View`
  background-color: black;
  flex: 1;
  align-items: center;
`;

const UserProfile = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #000;
  padding: 100px 0px;
`;

const Detail = styled.View`
  align-items: center;
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

const Content = styled.Text`
  color: white;
  margin-top: 20px;
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
  background-color: rgba(255, 255, 255, 0.2);
  flex: 1;
`;

const InfoBox = styled.View`
  width: 100%;
  margin: 0px 10px;
  /* background-color: rgba(255, 255, 255, 0.2); */
`;

const Info = styled.Text`
  color: white;
  text-align: left;
  font-size: 20px;
  margin-left: 7px;
`;

const InfoPlaceHolder = styled.Text`
  color: rgba(255, 255, 255, 0.3);
  text-align: left;
  font-size: 20px;
  margin-left: 7px;
`;
export default function MyProfile({ navigation, route }) {
  const { data } = useMe();

  const { data: QueryData } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username: data?.me?.username,
    },
  });

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
            <AvatarContainer>
              <Avatar source={{ uri: data.me.avatar }} />
            </AvatarContainer>
            <Content>
              {QueryData?.seeProfile?.bio ? QueryData?.seeProfile?.bio : null}
            </Content>
          </Detail>
          <Buttons>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile", { QueryData })}
            >
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
          <ContentTitle>BIO</ContentTitle>
          {QueryData?.seeProfile?.bio ? (
            <Info>{QueryData?.seeProfile?.bio}</Info>
          ) : (
            <InfoPlaceHolder>Not available</InfoPlaceHolder>
          )}
        </InfoBox>
        <InfoBox>
          <ContentTitle>LOCATION</ContentTitle>
          {QueryData?.seeProfile?.location ? (
            <Info>{QueryData?.seeProfile?.location}</Info>
          ) : (
            <InfoPlaceHolder>Not available</InfoPlaceHolder>
          )}
        </InfoBox>
      </DetailContainer>
    </ProfileContainer>
  );
}
