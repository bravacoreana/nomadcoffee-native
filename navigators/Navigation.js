import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import CreateShopForm from "../screens/CreateShopForm";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import FindAddress from "../screens/FindAddress";

const Stack = createStackNavigator();
const Button = styled.Button``;
export default function Navigation({ navigation }) {
  return (
    <Stack.Navigator
      mode="modal"
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
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="chevron-down" size={24} />
          ),
          title: "New post",
          headerTintColor: "white",
        }}
      />
      <Stack.Screen name="FindAddress" component={FindAddress} />
    </Stack.Navigator>
  );
}
