import React from "react";
import TabIcon from "../components/nav/TabIcons";
import SharedStackNav from "./SharedStackNav";
import useMe from "../hooks/useMe";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import LogIn from "../screens/LogIn";

const Tabs = createBottomTabNavigator();

export default function TabsNav({ isLoggedIn }) {
  const { data } = useMe();

  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        showLabel: false,
        style: {
          borderTopColor: "rgba(255,255,255,0.2)",
          // backgroundColor: (props) => props.backgroundColor,
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"ios-home"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Home" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"ios-search"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Camera"
        component={View}
        listeners={({ navigation }) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("UploadPhoto");
            },
          };
        }}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              iconName={"ios-camera"}
              color={color}
              focused={focused}
              size={28}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused, color }) =>
            data?.me?.avatar ? (
              <Image
                source={{ uri: data.me.avatar }}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  ...(focused && { borderColor: "white", borderWidth: 1 }),
                }}
              />
            ) : (
              <TabIcon iconName={"person"} color={color} focused={focused} />
            ),
        }}
      >
        {() =>
          isLoggedIn ? <SharedStackNav screenName="Profile" /> : <LogIn />
        }
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
