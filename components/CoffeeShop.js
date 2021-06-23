import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  ShadowPropTypesIOS,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text } from "react-native";
import { gql } from "@apollo/client";
import Maps from "./GeoCoder";
import { BlurView } from "expo-blur";

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
  const { id, categories, isMine, latitude, longitude, name, photos, user } =
    props;
  const { width, height, scale } = useWindowDimensions();

  return (
    <Container key={id}>
      <Column>
        <PhotoContainer>
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
          )}
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
            {categories
              ? categories.map((category) => (
                  <ShopCategory key={category.id}>
                    <Category>#{category.name}</Category>
                  </ShopCategory>
                ))
              : null}
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

// const Container = styled.View`
//   padding-bottom: 20px;
// `;
// const Header = styled.View`
//   padding: 5px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
// `;

// const HeaderLeft = styled.View`
//   flex-direction: row;
//   align-items: center;
// `;
// const HeaderRight = styled.View`
//   align-items: center;
//   margin-right: 5px;
// `;

// const UserAvatar = styled.Image`
//   margin-right: 10px;
//   width: 40px;
//   height: 40px;
//   border-radius: 20px;
// `;
// const Username = styled.Text`
//   color: white;
//   font-weight: 600;
// `;
// const File = styled.Image`
//   aspect-ratio: 1.25;
// `;
// const Actions = styled.View`
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
// `;
// const Action = styled.TouchableOpacity`
//   margin-right: 5px;
// `;
// const Likes = styled.Text`
//   color: white;
//   margin: 7px 0px;
//   font-weight: 600;
// `;
// const Caption = styled.View`
//   flex-direction: row;
// `;

// const Column = styled.TouchableOpacity`
//   width: 100%;
//   flex-direction: row;
//   justify-content: flex-end;
// `;
// const CategoryBox = styled.View`
//   color: white;
//   font-weight: 600;
//   background-color: rgba(255, 192, 203, 0.75);
//   border-radius: 20px;
// `;

// const FeedLeft = styled.View`
//   flex-direction: row;
//   align-items: center;
//   margin-left: 5px;
// `;
// const FeedRight = styled.View`
//   align-items: center;
//   margin-right: 5px;
// `;

// const Category = styled.Text`
//   color: white;
//   font-weight: 600;
//   text-align: center;
//   padding: 7px 10px;
// `;

// const FeedContainer = styled.View`
//   padding-top: 5px;
//   margin-bottom: 20px;
// `;

// export default function CoffeeShop(props) {
//   const { id, categories, isMine, latitude, longitude, name, photos, user } =
//     props;
//   const { width, height, scale } = useWindowDimensions();

//   return (
//     <Container key={id}>
//       <Header>
//         <TouchableOpacity>
//           <HeaderLeft>
//             <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
//             <Username>{name}</Username>
//           </HeaderLeft>
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <HeaderRight>
//             <CategoryBox>
//               {categories
//                 ? categories.map((category) => (
//                     <TouchableOpacity key={category.id}>
//                       <Category>#{category.name}</Category>
//                     </TouchableOpacity>
//                   ))
//                 : null}
//             </CategoryBox>
//           </HeaderRight>
//         </TouchableOpacity>
//       </Header>

//       {photos[0]?.url ? (
//         <File
//           resizeMode="contain"
//           style={{
//             width: width,
//             padding: 0,
//           }}
//           source={{ uri: photos[0].url }}
//         />
//       ) : (
//         <File
//           key={Math.random()}
//           source={{ uri: "https://picsum.photos/200" }}
//           style={{
//             width: width,
//             padding: 0,
//           }}
//         />
//       )}

//       <FeedContainer>
//         <Actions>
//           <FeedLeft>
//             <Action>
//               <Ionicons name="heart-outline" color="white" size={20} />
//             </Action>
//             <Action>
//               <Ionicons name="chatbubble-outline" color="white" size={18} />
//             </Action>
//           </FeedLeft>
//           <FeedRight>
//             <Text style={{ color: "white", alignItems: "center" }}>
//               <Ionicons name="location-outline" color="white" size={20} />
//               {latitude}, {longitude}
//             </Text>
//           </FeedRight>
//         </Actions>
//       </FeedContainer>
//     </Container>
//   );
// }
