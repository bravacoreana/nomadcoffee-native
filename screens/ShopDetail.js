import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Maps from "../components/GeoCoder";
import ShopCategoryComponent from "../components/Category";

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
`;

const CafeContainer = styled.View``;
const UserContainer = styled.View``;
const CaptionContainer = styled.View`
  margin-top: 20px;
`;

const UserColumn = styled.TouchableOpacity`
  flex-direction: row;
  margin: 20px 0;
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
  margin-top: 20px;
`;
const CategoryColumn = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;
const CategoryContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 90%;
`;

const ShopCategoryContainer = styled.View`
  margin-bottom: 5px;
  margin-right: 5px;
  /* flex-wrap: wrap; */
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
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <AvatarContainer>
              {route?.params?.user?.avatar ? (
                <Avatar source={{ uri: route.params.user.avatar }} />
              ) : (
                <Ionicons color="white" name="person-outline" size={20} />
              )}
            </AvatarContainer>
            <Content>{route?.params?.user?.username}</Content>
          </TouchableOpacity>
          <CaptionContainer>
            <Content>{route?.params?.caption}</Content>
          </CaptionContainer>
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
          <CategoryColumn>
            <IconContainer>
              <Ionicons name="information-outline" color="white" size={20} />
            </IconContainer>
            <CategoryContainer>
              {route?.params?.categories
                ? route.params.categories.map((category, index) => (
                    <ShopCategoryContainer key={"" + category.id}>
                      <ShopCategoryComponent {...category} key={category.id} />
                    </ShopCategoryContainer>
                  ))
                : null}
            </CategoryContainer>
          </CategoryColumn>
        </ContentContainer>
      </CafeContainer>
    </Container>
  );
}
