import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => (props.isDragingOver ? "#F36523" : "#CBCBCB")};
  height: ${(prop) => prop.railsWidth}mm;
  min-width: 10px;
  display: flex;
  // direction: ${(prop) =>
    prop.justify == "right" ? "ltr" : "rtl"} !important;

  // flex-direction: ${(prop) =>
    prop.justify == "right" ? "row" : "row-reverse"} !important;
`;
// flex-direction: ${(prop) =>
//   prop.justify == "right" ? "row-reverse" : "row"};
