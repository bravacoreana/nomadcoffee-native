import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import CreateShopForm from "../screens/CreateaShopForm";
import styled from "styled-components/native";

const Stack = createStackNavigator();
const Button = styled.Button``;
export default function Navigation({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabsNav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UploadPhoto"
        component={UploadNav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateShopForm"
        component={CreateShopForm}
        options={{
          headerRight: () => <Button title="Post" />,
        }}
      />
    </Stack.Navigator>
  );
}
