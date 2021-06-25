import React, { useState } from "react";
import Geocoder from "react-native-geocoding";
import { Text } from "react-native";

export default function Maps({ latitude, longitude }) {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  Geocoder.init("AIzaSyA0-2t63DuQXrAY6_aOR72w2RbWWMaU5Ak");
  Geocoder.from(latitude, longitude)
    .then((json) => {
      setAddress1(json.results[0].address_components[2].long_name);
      setAddress2(json.results[0].address_components[3].long_name);
      let components = json.results[0].address_components;
      components.forEach(
        (component) =>
          component.types.includes("administrative_area_level_1") &&
          setCity(component.long_name)
      );
    })
    .catch((error) => console.warn(error));

  return (
    <Text style={{ color: "white" }}>
      {address1}, {city}
    </Text>
  );
}
