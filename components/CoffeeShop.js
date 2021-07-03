import React from "react";
import styled from "styled-components/native";
import { useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Maps from "./GeoCoder";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import ShopCategoryComponent from "./Category";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Container = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 20px;
  height: 160px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.43);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const PhotoContainer = styled.View``;

const Column = styled.View`
  width: 50%;
  height: 100%;
`;
const File = styled.Image`
  aspect-ratio: 1.5;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;
const LikeButton = styled.TouchableOpacity`
  position: absolute;
  right: 5px;
  bottom: 5px;
`;

const ShopContainer = styled.View`
  height: 160px;
  margin-left: 15px;
  position: relative;
`;
const ShopName = styled.Text`
  color: white;
  font-size: 20px;
  margin-top: 10px;
`;

const Username = styled.Text``;

const ShopLocation = styled.Text`
  text-align: right;
  color: white;
`;

const ShopCategories = styled.View`
  position: absolute;
  right: 0;
  bottom: 20px;
  flex-direction: row;
`;

const ShopCategory = styled.TouchableOpacity`
  padding: 7px;
  background-color: rgba(255, 192, 203, 0.8);
  border-radius: 15px;
`;

const Category = styled.Text`
  color: white;
  font-weight: 600;
`;

export default function CoffeeShop(props) {
  const {
    id,
    categories,
    isMine,
    latitude,
    longitude,
    name,
    photos,
    user,
    likes,
    isLiked,
    caption,
  } = props;
  const { width, height, scale } = useWindowDimensions();
  const navigation = useNavigation();

  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const shopId = `CoffeeShop:${id}`;
      cache.modify({
        id: shopId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: { id },
    update: updateToggleLike,
  });

  const goToShopDetail = () => {
    navigation.navigate("ShopDetail", {
      id,
      categories,
      isMine,
      latitude,
      longitude,
      name,
      photos,
      user,
      likes,
      caption,
    });
  };

  return (
    <Container key={id} onPress={goToShopDetail}>
      <Column>
        <PhotoContainer>
          <File
            key={Math.random()}
            source={{ uri: "https://picsum.photos/200" }}
            style={{
              //   width: width,
              padding: 0,
            }}
          />
          {/* 
          {photos[0]?.url ? (
            <File
              resizeMode="cover"
              style={{
                //   width: width,
                padding: 0,
              }}
              source={{ uri: photos[0].url }}
            />
          ) : (
            <File
              key={Math.random()}
              source={{ uri: "https://picsum.photos/200" }}
              style={{
                //   width: width,
                padding: 0,
              }}
            />
          )} */}

          <LikeButton onPress={toggleLikeMutation}>
            <Ionicons
              name={isLiked ? "bookmark" : "bookmark-outline"}
              color={isLiked ? "pink" : "white"}
              size={20}
            />
          </LikeButton>
        </PhotoContainer>
      </Column>
      <Column>
        <ShopContainer>
          <ShopLocation>
            <Ionicons name="location-outline" color="white" size={20} />
            {/* {latitude}, {longitude} */}
            <Maps latitude={latitude} longitude={longitude} />
          </ShopLocation>
          <ShopName>{name}</ShopName>

          <ShopCategories>
            {categories ? (
              <ShopCategoryComponent
                {...categories[0]}
                key={categories[0].id}
              />
            ) : null}
          </ShopCategories>
        </ShopContainer>
      </Column>
    </Container>
  );
}

// const PHOTO_QUERY = gql`
//   query CoffeeShopPhoto {
//     id
//     url
//     shop
//     createdAt
//     updatedAt
//   }
// `;

// {photos[0]?.url ? (
//   <File
//     resizeMode="cover"
//     style={{
//       //   width: width,
//       padding: 0,
//     }}
//     source={{ uri: photos[0].url }}
//   />
// ) : (
//   <File
//     key={Math.random()}
//     source={{ uri: "https://picsum.photos/200" }}
//     style={{
//       //   width: width,
//       padding: 0,
//     }}
//   />
// )}
