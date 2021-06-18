import React from "react";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TouchableOpacity, View, Text } from "react-native";
import { colors } from "../colors";

const LogInLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
  font-size: 16px;
`;

export default function CreateAccount() {
  return (
    <View>
      <Text>CreateAccount</Text>
    </View>
  );
}
