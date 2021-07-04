import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex-direction: row;
`;
const CategoryContainer = styled.View`
  flex-direction: row;
  background-color: rgba(255, 192, 203, 0.7);
  margin-right: 5px;
  padding: 5px 7px;
  border-radius: 14px;
`;
const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default function ShopCategoryComponent(props) {
  const { onlyFirst } = props;
  return onlyFirst ? (
    <CategoryContainer key={"" + props.id}>
      <Text>#{props.name.split(",")[0]}</Text>
    </CategoryContainer>
  ) : (
    <Container key={props.id}>
      {props.name.split(",").map((prop, index) => (
        <CategoryContainer key={"" + prop + index}>
          <Text>#{prop.toLowerCase()}</Text>
        </CategoryContainer>
      ))}
    </Container>
  );
}
