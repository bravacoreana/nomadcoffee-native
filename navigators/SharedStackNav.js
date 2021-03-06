import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchNav from "./SearchNav";
import Home from "../screens/Home";
import ShopDetail from "../screens/ShopDetail";
import SignUp from "../screens/SignUp";
import LogIn from "../screens/LogIn";
import EditProfile from "../screens/EditProfile";
import Profile from "../screens/Profile";
import MyProfile from "../screens/MyProfile";
import EditShop from "../screens/EditShop";

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
        <Stack.Screen name="Profile" component={MyProfile} />
      ) : null}

      {screenName === "LogIn" ? (
        <Stack.Screen name="LogIn" component={LogIn} />
      ) : null}

      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ShopDetail" component={ShopDetail} />
      <Stack.Screen name="LookProfile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditShop" component={EditShop} />
    </Stack.Navigator>
  );
}
