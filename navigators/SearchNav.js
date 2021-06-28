import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchShops from "../screens/search/SearchShops";
import SearchCategories from "../screens/search/SearchCategories";
import SearchShopName from "../screens/search/SearchShopName";
import SearchUsers from "../screens/search/SearchUsers";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useWindowDimensions } from "react-native";
import { useForm } from "react-hook-form";
// import Search from "../screens/Search";

const Tab = createMaterialTopTabNavigator();

const Input = styled.TextInput`
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  background-color: rgba(255, 255, 255, 0.3);
  width: ${(props) => props.width / 1.2};
  padding: 7px;
  color: white;
  border-radius: 10px;
`;

export default function SearchNav({ navigation }) {
  const { width } = useWindowDimensions();
  const { setValue, register, watch, handleSubmit } = useForm();

  const onValid = ({ keyword }) => {
    // startQueryFn({
    //   variables: {
    //     keyword,
    //   },
    // });
  };

  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="rgba(255,255,255,0.5)"
      placeholder="search photo"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    // register("keyword", {
    //   required: true,
    //   minLength: 3,
    // });
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="SearchShops"
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        style: {
          backgroundColor: "black",
        },
        indicatorStyle: {
          backgroundColor: "white",
          bottom: 0,
        },
      }}
    >
      <Tab.Screen name="general" options={{ title: "general" }}>
        {() => <SearchShops />}
      </Tab.Screen>
      <Tab.Screen name="name" component={SearchShopName} />
      <Tab.Screen name="category" component={SearchCategories} />
      <Tab.Screen name="users" component={SearchUsers} />
    </Tab.Navigator>
  );
}
