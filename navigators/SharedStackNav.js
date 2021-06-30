import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import SearchNav from "./SearchNav";
import ShopDetail from "../screens/ShopDetail";

const Stack = createStackNavigator();

export default function ({ screenName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          shadowColor: "rgba(255,255,255,0.2)",
          // backgroundColor: (props) => props.backgroundColor,
          backgroundColor: "black",
        },
      }}
    >
      {screenName === "Home" ? (
        <Stack.Screen name="Home" component={Home} />
      ) : null}

      {screenName === "Search" ? (
        <Stack.Screen name="Search" component={SearchNav} />
      ) : null}

      {screenName === "Profile" ? (
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerStyle: {
              backgroundColor: "#B09F7D",
            },
          }}
        />
      ) : null}
      <Stack.Screen name="ShopDetail" component={ShopDetail} />
    </Stack.Navigator>
  );
}
