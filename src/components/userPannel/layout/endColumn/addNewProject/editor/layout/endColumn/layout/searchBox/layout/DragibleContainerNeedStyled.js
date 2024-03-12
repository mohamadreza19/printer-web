import styled from "styled-components";

export default styled.div`
  width: ${(prop) => prop.productWidth + "mm"};
  max-width: ${(prop) => prop.productWidth + "mm"};
  width: 20px;
  height: ${(prop) => prop.height + "mm"};
  max-height: ${(prop) => prop.height + "mm"};

  z-index: ${(prop) => (prop.isDragging ? "5000" : "-99")} !important;
  position: fixed;
  display: "block";
  background: white;
  border: 1.5px solid #f36523;
`;

//   // max-width: ${(prop) =>
//     prop.isDragging ? `${prop.productWidth}px` : "100%"};
//   // min-width: ${(prop) =>
//     prop.isDragging ? `${prop.productWidth}px` : "100%"};

//   max-height: ${(prop) => (prop.isDragging ? `54.32px` : "100%")};
//   background: white;
//   border: ${(props) => (props.isDragging ? "1.5px solid #F36523" : "none")};
// `;
