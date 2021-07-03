import React, { useEffect } from "react";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { CREATE_SHOP_MUTATION } from "../queries/shopQueries";
// import MapsAddress from "../components/ReGeoCoder";

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

const TextFormAddress = styled.TextInput`
  display: none;
`;
const TextCaption = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.15);
  flex: 1;
  margin-left: 10px;
  color: white;
  padding: 18px 10px;
  border-radius: 3px;
  height: 100px;
`;

const BottomColumn = styled.View``;

const Button = styled.Button``;

const HeaderRightText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-right: 5px;
`;

const LoadingContainer = styled.View`
  background-color: black;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default function CreateShopForm({ navigation, route }) {
  const { register, handleSubmit, setValue, watch, getValues } = useForm({
    defaultValues: {
      latitude: "" + route?.params?.latitude,
      longitude: "" + route?.params?.longitude,
    },
  });

  const updateShop = (cache, result) => {
    const {
      data: { createCoffeeShop },
    } = result;

    if (createCoffeeShop.ok) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeCoffeeShops(prev) {
            [createCoffeeShop, ...prev];
          },
        },
      });
      navigation.navigate("Tabs");
    }
  };
  const [createShopMutation, { loading }] = useMutation(CREATE_SHOP_MUTATION, {
    update: updateShop,
  });

  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Post</HeaderRightText>
    </TouchableOpacity>
  );

  const onValid = ({ caption, categories, latitude, longitude, name }) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: `1.jpeg`,
      type: "image/jpeg",
    });
    // const { caption, name, latitude, longitude, categories } = getValues();

    createShopMutation({
      variables: {
        name,
        photos: file,
        caption,
        categories,
        latitude,
        longitude,
      },
    });
  };

  useEffect(() => {
    register("name", { required: true });
    register("latitude", { required: true });
    register("longitude", { required: true });
    register("caption");
    register("categories");
  }, [register]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? null : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, []);

  const goToMap = () => {
    navigation.navigate("FindAddress");
  };

  return (
    <DismissKeyboard>
      {!loading ? (
        <Container>
          <TopColumn>
            <PhotoContainer>
              <Photo resizeMode="contain" source={{ uri: route.params.file }} />
            </PhotoContainer>
            <TextCaption
              placeholder="Write a caption"
              value={watch("caption")}
              returnKeyType="next"
              placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
              onChangeText={(text) => setValue("caption", text)}
              multiline={true}
            />
          </TopColumn>
          <BottomColumn>
            <TextForm
              placeholder="Add cafe name"
              value={watch("name")}
              returnKeyType="next"
              placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
              onChangeText={(text) => setValue("name", text)}
              // onSubmitEditing={() => onNext(captionRef)}
            />
            <TextForm
              placeholder="Add category"
              value={watch("categories")}
              returnKeyType="next"
              placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
              onChangeText={(text) => setValue("categories", text)}
              // onSubmitEditing={() => onNext(addressRef)}
            />

            <TextFormAddress
              placeholder="Add address"
              value={"" + route?.params?.latitude || watch("latitude")}
              returnKeyType="next"
              placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
              onChangeText={(text) => setValue("latitude", text)}
            />
            <TextFormAddress
              placeholder="Add address"
              value={"" + route?.params?.longitude || watch("longitude")}
              placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
              onChangeText={(text) => setValue("longitude", text)}
              returnKeyType="done"
            />

            <Button title="Find your location on map" onPress={goToMap} />
          </BottomColumn>
          {/* <MapsAddress /> */}
        </Container>
      ) : (
        <LoadingContainer>
          <ActivityIndicator color="white" size="large" />
        </LoadingContainer>
      )}
    </DismissKeyboard>
  );
}
