import React, { useState } from "react";
import Geocoder from "react-native-geocoding";
import { Text } from "react-native";

export default function Maps({ latitude, longitude }) {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  Geocoder.init("AIzaSyA0-2t63DuQXrAY6_aOR72w2RbWWMaU5Ak"); // use a valid API key
  Geocoder.from(latitude, longitude)
    .then((json) => {
      setAddress1(json.results[0].address_components[2].long_name);
      setAddress2(json.results[0].address_components[3].long_name);
      // console.log(json.results[0].formatted_address);
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

// export default function Maps({ latitude, longitude }) {
//   const [address, setAddress] = useState("");
//   Geocoder.init("AIzaSyA0-2t63DuQXrAY6_aOR72w2RbWWMaU5Ak", {
//     result_type: "political",
//   });
//   Geocoder.from(latitude, longitude)
//     .then((json) => {
//       setAddress(json.results[0].formatted_address);
//       // const [address, setAddress] = useState("");
//       // setAddress(json.results[0].formatted_address);
//       // return <Text style={{ color: "white" }}>{address}</Text>;
//     })
//     .catch((error) => console.warn(error));
//   return <Text style={{ color: "white" }}>{address}</Text>;
// }
