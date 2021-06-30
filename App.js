import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import client, { cache, isLoggedInVar, tokenVar } from "./apollo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { AppearanceProvider } from "react-native-appearance";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, persistCache } from "apollo3-cache-persist";
import Navigation from "./navigators/Navigation";
import { Appearance } from "react-native";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles";

export default function App() {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const onFinish = () => setLoading(false);

  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imageToLoad = [require("./assets/logo.png")];
    const imagePromises = imageToLoad.map((image) => Asset.loadAsync(image));

    return Promise.all([...fontPromises, ...imagePromises]);
  };

  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    await persistCache({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
      serialize: false,
    });
    return preloadAssets();
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  const light = Appearance.getColorScheme() === "light";

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={light ? lightTheme : darkTheme}>
        <AppearanceProvider>
          <NavigationContainer>
            {/* {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />} */}
            <Navigation isLoggedIn={isLoggedIn} />
          </NavigationContainer>
        </AppearanceProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
