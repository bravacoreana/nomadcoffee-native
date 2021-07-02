import React, { useEffect } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Maps from "../components/GeoCoder";
<<<<<<< HEAD
import ShopCategoryComponent from "../components/Category";
=======
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9

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
<<<<<<< HEAD
=======

  /* height: 61.35%; */
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
`;

const CafeContainer = styled.View``;
const UserContainer = styled.View``;
const UserColumn = styled.View`
  flex-direction: row;
<<<<<<< HEAD
  margin-top: 20px;
  align-items: center;
`;
const IconContainer = styled.View`
  margin-right: 20px;
`;

const AvatarContainer = styled.View`
  padding: 20px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 40px;
  margin-right: 20px;
`;
const ContentContainer = styled.View`
  /* border: 1px solid yellow; */
  margin-top: 20px;
`;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 3px 0px;
`;

const Content = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const ContentText = styled.Text`
=======
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
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
  color: white;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;
<<<<<<< HEAD

=======
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
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
<<<<<<< HEAD
            <AvatarContainer>
              {route?.params?.user?.avatar ? (
                <Avatar source={{ uri: route.params.user.avatar }} />
              ) : (
                <Ionicons color="white" name="person-outline" size={20} />
              )}
            </AvatarContainer>
            <Content>{route?.params?.user?.username}</Content>
          </UserColumn>
          <UserColumn>
            <Content>{route?.params?.caption}</Content>
          </UserColumn>
        </UserContainer>
        <ContentContainer>
          <Column>
            <IconContainer>
              <Ionicons color="white" name="navigate-outline" size={20} />
            </IconContainer>
            <ContentText>
              {route?.params?.latitude && route?.params?.longitude ? (
                <Maps
                  latitude={route.params.latitude}
                  longitude={route.params.longitude}
                />
              ) : (
                "no place information"
              )}
            </ContentText>
          </Column>
          <Column>
            <IconContainer>
              <Ionicons color="white" name="heart-outline" size={20} />
            </IconContainer>
            <ContentText>
              {route?.params?.likes} people like this cafe.
            </ContentText>
          </Column>
          <Column>
            <IconContainer>
              <Ionicons name="information-outline" color="white" size={20} />
            </IconContainer>
            {route?.params?.categories
              ? route.params.categories.map((category) => (
                  <ShopCategoryComponent {...category} />
                ))
              : null}
          </Column>
        </ContentContainer>
=======
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
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
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
