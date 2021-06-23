import React from "react";
import { ActivityIndicator, Image, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View``;
const Background = styled.Image`
  width: 100%;
  height: 100%;
`;

export default function ScreenLayout({ loading, children }) {
  return (
    <Container
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? <ActivityIndicator color="white" /> : children}
    </Container>
  );
}
