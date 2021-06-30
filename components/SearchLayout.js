import { ActivityIndicator, View } from "react-native";
import styled from "styled-components";
import DismissKeyboard from "../../../search-temp/components/DismissKeyboard";

const Container = styled.View`
  flex: 1;
  background-color: "white";
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 20px;
`;

export default function SearchLayout({ loading, called, children }) {
  return (
    <DismissKeyboard>
      <Container style={{ flex: 1, backgroundColor: "black" }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {children}
      </Container>
    </DismissKeyboard>
  );
}
