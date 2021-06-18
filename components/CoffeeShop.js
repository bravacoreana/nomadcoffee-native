import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text } from "react-native";
import { gql } from "@apollo/client";

const PHOTO_QUERY = gql`
  query CoffeeShopPhoto {
    id
    url
    shop
    createdAt
    updatedAt
  }
`;

const Container = styled.View`
  padding-bottom: 20px;
`;
const Header = styled.View`
  padding: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;
const HeaderRight = styled.View`
  align-items: center;
  margin-right: 5px;
`;

const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
`;
const File = styled.Image`
  aspect-ratio: 1.25;
`;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Action = styled.TouchableOpacity`
  margin-right: 5px;
`;
const Likes = styled.Text`
  color: white;
  margin: 7px 0px;
  font-weight: 600;
`;
const Caption = styled.View`
  flex-direction: row;
`;

const Column = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;
const CategoryBox = styled.View`
  color: white;
  font-weight: 600;
  background-color: rgba(255, 192, 203, 0.75);
  border-radius: 20px;
  /* padding: 8px 15px; */
  /* width: 80px; */
`;

const FeedLeft = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
`;
const FeedRight = styled.View`
  align-items: center;
  margin-right: 5px;
`;

const Category = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
  padding: 7px 10px;
`;

const FeedContainer = styled.View`
  padding-top: 5px;
`;

export default function CoffeeShop(props) {
  const { id, isMine, latitude, longitude, name, photos, user, categories } =
    props;
  const { width, height, scale } = useWindowDimensions();
  // const navigation = useNavigation();
  // console.log(photos.map((photo) => photo.url));

  return (
    <Container>
      <TouchableOpacity>
        <Header>
          <HeaderLeft>
            <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
            <Username>{name}</Username>
          </HeaderLeft>
          <HeaderRight>
            <CategoryBox>
              {categories
                ? categories.map((category) => (
                    <TouchableOpacity key={category.id}>
                      <Category>#{category.name}</Category>
                    </TouchableOpacity>
                  ))
                : null}
            </CategoryBox>
          </HeaderRight>
        </Header>
      </TouchableOpacity>

      {photos[0]?.url ? (
        <File
          resizeMode="contain"
          style={{
            width: width,
            padding: 0,
          }}
          source={{ uri: photos[0].url }}
        />
      ) : (
        <File
          source={{ uri: "https://picsum.photos/200" }}
          style={{
            width: width,
            padding: 0,
          }}
        />
      )}

      <FeedContainer>
        <Actions>
          <FeedLeft>
            <Action>
              <Ionicons name="heart-outline" color="white" size={20} />
            </Action>
            <Action>
              <Ionicons name="chatbubble-outline" color="white" size={18} />
            </Action>
          </FeedLeft>
          <FeedRight>
            <Text style={{ color: "white", alignItems: "center" }}>
              <Ionicons name="location-outline" color="white" size={20} />
              {latitude}, {longitude}
            </Text>
          </FeedRight>
        </Actions>
      </FeedContainer>
    </Container>
  );
}
