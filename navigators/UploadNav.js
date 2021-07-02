import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screens/camera/SelectPhoto";
import TakePhoto from "../screens/camera/TakePhoto";
import { createStackNavigator } from "@react-navigation/stack";
<<<<<<< HEAD
import { Ionicons } from "@expo/vector-icons";
=======
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function UploadNav() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        style: {
          backgroundColor: "black",
        },
        activeTintColor: "white",
        indicatorStyle: {
          backgroundColor: "white",
          top: 0,
        },
      }}
    >
      <Tab.Screen name="Select">
        {() => (
<<<<<<< HEAD
          <Stack.Navigator
            screenOptions={{
              headerTintColor: "white",
              headerBackTitleVisible: false,
              headerStyle: { backgroundColor: "black", shadowOpacity: 0.3 },
              headerBackImage: ({ tintColor }) => (
                <Ionicons color={tintColor} name="close" size={24} />
              ),
            }}
          >
            <Stack.Screen
              name="Select"
              options={{ title: "Select a photo" }}
              component={SelectPhoto}
            />
=======
          <Stack.Navigator>
            <Stack.Screen name="Select" component={SelectPhoto} />
>>>>>>> d00360432558c3c585bb8ef2e314b5a44c8b01b9
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto}></Tab.Screen>
    </Tab.Navigator>
  );
}
