import styled from "styled-components/native";
// import { colors } from "../../colors";

export const TextInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.1);

  padding: 18px 10px;
  margin-bottom: 8px;
  /* flex: 1; */
  color: #fff;
  margin-bottom: ${(props) => (props.lastOne ? "15" : 8)}px;
`;
