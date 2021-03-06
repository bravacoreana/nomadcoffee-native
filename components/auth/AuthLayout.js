import React from "react";
import styled from "styled-components/native";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import DismissKeyboard from "../DismissKeyboard";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0px 40px;
`;

const LogoContainer = styled.View`
  align-items: center;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
`;

export default function AuthLayout({ children }) {
  return (
    <DismissKeyboard>
      <Container>
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
          <LogoContainer>
            <Logo
              resizeMode="contain"
              source={require("../../assets/logo.png")}
            />
          </LogoContainer>
          {children}
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
}
