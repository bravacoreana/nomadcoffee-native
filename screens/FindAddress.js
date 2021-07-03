import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// import { TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import styled from "styled-components/native";
import Geocoder from "react-native-geocoding";
import { useState } from "react/cjs/react.development";
// import { Location, Permissions } from "expo";
// import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const InputContainer = styled.View`
  /* flex: 1; */
  /* margin-top: 10px; */
  /* width: 100%; */
  /* flex-direction: row; */
`;

const TextInput = styled.TextInput`
  width: 100%;
  height: 50px;
  color: white;
  padding: 20px;
  margin: 10px 0px;
  padding: 5px;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.3);
`;

const Text = styled.Text`
  color: white;
`;

const Button = styled.Button``;

export default function FindAddress({ navigation }) {
  const [location, setLocation] = useState({
    latitude: 37.5326,
    longitude: 127.024612,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const { register, setValue, handleSubmit, getValues, watch } = useForm();

  const getPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  useEffect(() => {
    getPermission();
    // (async () => {
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== "granted") {
    //     setErrorMsg("Permission to access location was denied");
    //     return;
    //   }

    //   let location = await Location.getCurrentPositionAsync({});
    //   setLocation({
    //     latitude: location.coords.latitude,
    //     longitude: location.coords.longitude,
    //   });
    // })();
  }, []);

  useEffect(() => {
    register("address");
  }, [register]);

  const onValid = ({ address }) => {
    // Geocoder.init("AIzaSyA0-2t63DuQXrAY6_aOR72w2RbWWMaU5Ak", {
    //   location_type: "ROOFTOP",
    // });
    // Geocoder.from(address)
    //   .then((json) => json.results[0].geometry.location)
    //   .then((data) => {
    //     setLocation({
    //       latitude: data.lat,
    //       longitude: data.lng,
    //     });
    //   })
    //   .catch((error) => console.warn(error));
  };

  const onCompleted = (data) => {
    navigation.navigate("CreateShopForm", location);
  };
  return (
    <Container>
      <InputContainer>
        <TextInput
          autoCorrect={false}
          placeholder="Add address"
          placeholderTextColor="rgba(255,255,255,1)"
          returnKeyLabel="Send Message"
          returnKeyType="send"
          onChangeText={(text) => setValue("address", text)}
          onSubmitEditing={handleSubmit(onValid)}
        />
        <Button onPress={() => onCompleted(location)} title="Submit" />
      </InputContainer>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          height: "50%",
          width: "100%",
        }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.035,
          longitudeDelta: 0.035,
        }}
      >
        <Marker
          title="San Fransco"
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        ></Marker>
      </MapView>
    </Container>
  );
}
