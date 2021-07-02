import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: rgba(255, 192, 203, 0.7);
  padding: 5px 7px;
  border-radius: 14px;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default function ShopCategoryComponent(props) {
  return (
    <Container key={props.id}>
      <Text>#{props.name}</Text>
    </Container>
  );
}
