import React, { useEffect } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Maps from "../components/GeoCoder";

const Container = styled.View`
  background-color: black;
  flex: 1;
`;
const PhotoContainer = styled.View`
  aspect-ratio: 1.5;
`;
const Photo = styled.Image`
  aspect-ratio: 1.5;
  width: 100%;

  /* height: 61.35%; */
`;

const CafeContainer = styled.View``;
const UserContainer = styled.View``;
const UserColumn = styled.View`
  flex-direction: row;
  padding: 15px;
  align-items: center;
`;

const Column = styled.View`
  flex-direction: row;
`;
const Title = styled.Text`
  color: white;
`;
const Content = styled.Text`
  color: white;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;
export default function ShopDetail({ navigation, route }) {
  useEffect(() => {
    if (route?.params?.name) {
      navigation.setOptions({
        title: route.params.name,
      });
    }
  }, []);

  return (
    <Container>
      <PhotoContainer>
        {/* {route?.params?.photos ? (
          <Photo source={{ uri: route.params.photos[0].url }} />
        ) : (
          <Photo
            key={Math.random()}
            source={{ uri: "https://picsum.photos/200" }}
            style={{
              //   width: width,
              padding: 0,
            }}
          />
        )} */}
        <Photo
          key={Math.random()}
          source={{ uri: "https://picsum.photos/200" }}
          style={{
            //   width: width,
            padding: 0,
          }}
        />
      </PhotoContainer>
      <CafeContainer>
        <UserContainer>
          <UserColumn>
            {route?.params?.user?.avatar ? (
              <Avatar source={{ uri: route.params.user.avatar }} />
            ) : (
              <Ionicons color="white" name="person-outline" size={20} />
            )}
            <Content>{route?.params?.user?.username}</Content>
          </UserColumn>
        </UserContainer>
        <Column>
          <Ionicons color="white" name="navigate-outline" size={20} />
          {route?.params?.latitude && route?.params?.longitude ? (
            <Maps
              latitude={route.params.latitude}
              longitude={route.params.longitude}
            />
          ) : (
            <Content>no place information</Content>
          )}
        </Column>
        <Column>
          <Ionicons color="white" name="heart-outline" size={20} />
          <Content>{route?.params?.name}</Content>
        </Column>
        <Column>
          <Title>Information: </Title>
          <Content>{route?.params?.name}</Content>
        </Column>
      </CafeContainer>
    </Container>
    // <View
    //   style={{
    //     backgroundColor: "black",
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    // >
    //   <Text style={{ color: "white" }}>Shop Detail</Text>
    // </View>
  );
}
