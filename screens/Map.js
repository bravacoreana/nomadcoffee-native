// import React, { useState } from "react";
// import Geocoder from "react-native-geocoding";
// import ScreenLayout from "../components/ScreenLayout";
// import { FlatList, View, Text } from "react-native";

// export default function Maps() {
//   // Initialize the module (needs to be done only once)
//   Geocoder.init("AIzaSyA0-2t63DuQXrAY6_aOR72w2RbWWMaU5Ak"); // use a valid API key
//   // With more options
//   // Geocoder.init("xxxxxxxxxxxxxxxxxxxxxxxxx", {language : "en"}); // set the language

//   // Search by address
//   Geocoder.from("Colosseum")
//     .then((json) => {
//       var location = json.results[0].geometry.location;
//     })
//     .catch((error) => console.warn(error));

//   // Search by address, with a biased geo-bounds
//   Geocoder.from("Pyramid", {
//     southwest: { lat: 36.05, lng: -115.25 },
//     northeast: { lat: 36.16, lng: -115.1 },
//   })
//     .then((json) => {
//       var location = json.results[0].geometry.location;
//     })
//     .catch((error) => console.warn(error));

//   // Search by geo-location (reverse geo-code)
//   Geocoder.from(41.89, 12.49)
//     .then((json) => {
//       var addressComponent = json.results[0].address_components[0];
//       console.log(addressComponent);
//     })
//     .catch((error) => console.warn(error));

//   // location object
//   Geocoder.from({
//     latitude: 41.89,
//     longitude: 12.49,
//   });

//   // latlng object
//   Geocoder.from({
//     lat: 41.89,
//     lng: 12.49,
//   });

//   // array
//   const a = Geocoder.from([41.89, 12.49]);

//   return (
//     <ScreenLayout>
//       <Text>Hi</Text>
//     </ScreenLayout>
//   );
// }
