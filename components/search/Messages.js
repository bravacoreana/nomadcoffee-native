import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Message = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 20px;
`;

export const SearchMessage = ({ message, indicator }) => {
  return (
    <Container>
      {indicator && <ActivityIndicator />}
      <Message>{message}</Message>
    </Container>
  );
};
