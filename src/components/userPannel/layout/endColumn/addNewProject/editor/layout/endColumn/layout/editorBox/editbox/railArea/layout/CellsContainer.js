import styled from "styled-components";

export const Container = styled.table`
  background-color: ${(props) => (props.isDragingOver ? "#F36523" : "#CBCBCB")};
  height: ${(prop) => prop.railsWidth}px;
  
  min-width: 100px;
  padding-right:${(prop) => (prop.railsLength ? "0" : "40px")} 
  width: ${(prop) => prop.railsLength}mm;
  border-collapse: collapse;
`;
// flex-direction: ${(prop) =>
//   prop.justify == "right" ? "row-reverse" : "row"};
