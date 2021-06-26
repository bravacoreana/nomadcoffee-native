import React, { useState } from "react";
import { Text } from "react-native";
import Geocoder from "react-native-geocoding";

export default function Maps({ latitude, longitude }) {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  Geocoder.init("AIzaSyA0-2t63DuQXrAY6_aOR72w2RbWWMaU5Ak", {
    result_type: "political",
  });
  Geocoder.from(latitude, longitude)
    .then((json) => {
      setAddress1(json.results[0].address_components[1].short_name);
      setAddress2(json.results[0].address_components[2].short_name);
      let components = json.results[0].address_components;
      components.forEach(
        (component) =>
          component.types.includes("administrative_area_level_1") &&
          setAddress2(component.long_name)
      );
    })
    .catch((error) => console.warn(error));

  return (
    <Text style={{ color: "white" }}>
      {address1}, {address2}
    </Text>
  );
}
