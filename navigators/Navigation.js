import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
<<<<<<< HEAD
import CreateShopForm from "../screens/CreateShopForm";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import FindAddress from "../screens/FindAddress";
=======
import CreateShopForm from "../screens/CreateaShopForm";
import styled from "styled-components/native";
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9

const Stack = createStackNavigator();
const Button = styled.Button``;
export default function Navigation({ navigation }) {
  return (
    <Stack.Navigator
<<<<<<< HEAD
      mode="modal"
=======
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
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
<<<<<<< HEAD
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="chevron-down" size={24} />
          ),
          title: "New post",
          headerTintColor: "white",
        }}
      />
      <Stack.Screen name="FindAddress" component={FindAddress} options={{}} />
=======
          headerRight: () => <Button title="Post" />,
        }}
      />
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
    </Stack.Navigator>
  );
}
