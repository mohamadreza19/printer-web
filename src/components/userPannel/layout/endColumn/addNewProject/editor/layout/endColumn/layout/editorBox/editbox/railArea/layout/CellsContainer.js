import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => (props.isDragingOver ? "#F36523" : "#CBCBCB")};
  height: ${(prop) => prop.railsWidth}mm;

  min-width: 10px;
  width: ${(prop) => prop.railsLength}mm;
  display: flex;
  flex-wrap: wrap;
`;
// flex-direction: ${(prop) =>
//   prop.justify == "right" ? "row-reverse" : "row"};
