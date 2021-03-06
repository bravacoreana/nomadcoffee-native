import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchShops from "../screens/search/SearchShops";
import SearchCategories from "../screens/search/SearchCategories";
import SearchShopName from "../screens/search/SearchShopName";
import SearchUsers from "../screens/search/SearchUsers";
import styled from "styled-components/native";
import { useWindowDimensions } from "react-native";
import { useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import {
  SEARCH_CATEGORIES,
  SEARCH_GENERAL,
  SEARCH_SHOPNAME,
  SEARCH_USER,
} from "../queries";

const Tab = createMaterialTopTabNavigator();

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.3);
  width: ${(props) => props.width / 1.2}px;
  padding: 7px;
  color: white;
  border-radius: 10px;
`;

export default function SearchNav({ navigation }) {
  const { width } = useWindowDimensions();
  const { setValue, register, watch, handleSubmit } = useForm();

  const [
    startQueryFnGeneral,
    {
      loading: loadingGeneral,
      data: dataGeneral,
      refetch: refetchGeneral,
      called: calledGeneral,
      fetchMore: fetchMoreGeneral,
    },
  ] = useLazyQuery(SEARCH_GENERAL, {
    fetchPolicy: "no-cache",
    variables: { offset: 0 },
  });

  const [
    startQueryFnShopName,
    {
      loading: loadingShopName,
      data: dataShopName,
      refetch: refetchShopName,
      called: calledShopName,
      fetchMore: fetchMoreShopName,
    },
  ] = useLazyQuery(SEARCH_SHOPNAME, {
    fetchPolicy: "no-cache",
    variables: { offset: 0 },
  });

  const [
    startQueryFnCategories,
    {
      loading: loadingCategories,
      data: dataCategories,
      refetch: refetchCategories,
      called: calledCategories,
      fetchMore: fetchMoreCategories,
    },
  ] = useLazyQuery(SEARCH_CATEGORIES, {
    fetchPolicy: "no-cache",
    variables: { offset: 0 },
  });

  const [
    startQueryFnUsers,
    {
      loading: loadingUser,
      data: dataUser,
      refetch: refetchUser,
      called: calledUser,
      fetchMore: fetchMoreUser,
    },
  ] = useLazyQuery(SEARCH_USER, {
    fetchPolicy: "no-cache",
    variables: { offset: 0 },
  });

  const onValid = ({ keyword }) => {
    startQueryFnGeneral({
      variables: {
        keyword,
      },
    });
    startQueryFnShopName({
      variables: {
        keyword,
      },
    });
    startQueryFnCategories({
      variables: {
        keyword,
      },
    });
    startQueryFnUsers({
      variables: {
        keyword,
      },
    });
  };

  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="rgba(255,255,255,0.5)"
      placeholder="search"
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
    register("keyword", {
      required: true,
      minLength: 1,
    });
  }, [register]);

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
        {() => (
          <SearchShops
            loading={loadingGeneral}
            data={dataGeneral}
            called={calledGeneral}
            refetch={refetchGeneral}
            fetchMore={fetchMoreGeneral}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="name" options={{ title: "shop" }}>
        {() => (
          <SearchShopName
            loading={loadingShopName}
            data={dataShopName}
            called={calledShopName}
            refetch={refetchShopName}
            fetchMore={fetchMoreShopName}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="category">
        {() => (
          <SearchCategories
            loading={loadingCategories}
            data={dataCategories}
            called={calledCategories}
            refetch={refetchCategories}
            fetchMore={fetchMoreCategories}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="searchUsers" options={{ title: "users" }}>
        {() => (
          <SearchUsers
            loading={loadingUser}
            data={dataUser}
            called={calledUser}
            refetch={refetchUser}
            fetchMore={fetchMoreUser}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
