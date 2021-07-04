import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "../screens/LogIn";
import useMe from "../hooks/useMe";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();

export default function ProfileNav() {
  const { data } = useMe();

  return (
    <Stack.Navigator
      initialRouteName={data?.me ? "Profile" : "LogIn"}
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: false,
        headerTransparent: true,
        headerTintColor: "white",
      }}
    >
      {data.me ? (
        <Stack.screen name="Profile" component={Profile} />
      ) : (
        <Stack.Screen name="LogIn" component={LogIn} />
      )}
    </Stack.Navigator>
  );
}
