import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useForm } from "react-hook-form";
import { CREATE_COFFEESHOP_MUTATION } from "../mutations";
import { useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 10px;
`;

const PhotoContainer = styled.View`
  border: 1px solid red;
  height: 100px;
  /* margin-right: 20px; */
`;

const Photo = styled.Image`
  height: 100%;
  aspect-ratio: 1;
`;

const TopColumn = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  width: 100%;
`;

const TextForm = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 18px 10px;
  margin-bottom: 8px;
  border-radius: 3px;
  color: white;
  width: 100%;
`;

const TextCaption = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.15);
  flex: 1;
  margin-left: 10px;
  color: white;
  padding: 18px 10px;
  border-radius: 3px;
`;

const BottomColumn = styled.View``;

const Button = styled.Button``;

export default function CreateShopForm({ route, navigation }) {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const updateUploadShop = (cache, result) => {
    const {
      data: { createCoffeeShop },
    } = result;
    console.log(createCoffeeShop);
    if (createCoffeeShop.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeCoffeeShops(prev) {
            return [createCoffeeShop, ...prev]; // adding one more photo in seeFeed
          },
        },
      });
      navigation.navigate("Tabs");
    }
  };

  const [createCoffeeShopMutation, { loading }] = useMutation(
    CREATE_COFFEESHOP_MUTATION,
    {
      onCompleted,
      // updateUploadShop,
    }
  );

  const onCompleted = ({ data }) => {
    console.log(data);
    // const {
    //   createCoffeeShop: { ok },
    // } = data;
    // const { name, category, address } = getValues();
    // console.log(name, category, address);
    // if (ok) {
    //   // navigation.navigate("Home");
    //   console.log("HAHAHA");
    // }
  };

  const onNext = (arg) => {
    arg?.current?.focus();
  };

  const onValid = (data) => {
    const { caption, categories, latitude, longitude, name } = data;
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: `1.jpeg`,
      type: "image/jpeg",
    });
    // console.log(caption, categories, latitude, longitude, name);
    // console.log(file);

    createCoffeeShopMutation({
      variables: {
        photos,
        caption,
        categories,
        latitude,
        longitude,
        name,
      },
    });
  };

  const captionRef = useRef();
  const cafeNameRef = useRef();
  const addressRef = useRef();
  const categoryRef = useRef();

  useEffect(() => {
    register("name");
    register("latitude");
    register("longitude");
    register("categories");
    register("caption");
  }, [register]);

  return (
    <DismissKeyboard>
      <Container>
        <TopColumn>
          <PhotoContainer>
            <Photo resizeMode="contain" source={{ uri: route.params.file }} />
          </PhotoContainer>
          <TextCaption
            placeholder="Write a caption"
            returnKeyType="next"
            placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
            onChangeText={(text) => setValue("caption", text)}
            onSubmitEditing={() => onNext(cafeNameRef)}
          />
        </TopColumn>
        <BottomColumn>
          <TextForm
            placeholder="Add cafe name"
            returnKeyType="next"
            placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
            onChangeText={(text) => setValue("name", text)}
            onSubmitEditing={() => onNext(captionRef)}
          />
          <TextForm
            placeholder="Add category"
            returnKeyType="next"
            placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
            onChangeText={(text) => setValue("categories", text)}
            onSubmitEditing={() => onNext(addressRef)}
          />
          <TextForm
            placeholder="Add address"
            returnKeyType="next"
            placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
            onChangeText={(text) => setValue("latitude", text)}
          />
          <TextForm
            placeholder="Add address"
            returnKeyType="next"
            placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
            onChangeText={(text) => setValue("longitude", text)}
          />
          <Button title="Add location" />
          <Button title="Post" onPress={handleSubmit(onValid)} />

          {/* <MapView
            provider={PROVIDER_GOOGLE}
            style={{
              height: "100%",
            }}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.035,
              longitudeDelta: 0.035,
            }}
          /> */}
        </BottomColumn>
      </Container>
    </DismissKeyboard>
  );
}
