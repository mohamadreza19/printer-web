import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => (props.isDragingOver ? "#F36523" : "#CBCBCB")};
  height: ${(prop) => prop.railsWidth}px;
  min-width: 100px;
`;
