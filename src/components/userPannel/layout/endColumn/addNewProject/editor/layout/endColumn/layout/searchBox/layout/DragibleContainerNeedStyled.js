import styled from 'styled-components';

export default styled.div`
  width: ${(prop) => prop.productWidth + 'mm'};
  max-height: ${(prop) => (prop.isDragging ? prop.height + 'mm' : '100%')};
  display: ${(prop) => (prop.isDragging ? 'block' : 'nones')};
  background: white;
  border: 1.5px solid #f36523;
  // export default styled.div
`;

//   // max-width: ${(prop) =>
//     prop.isDragging ? `${prop.productWidth}px` : "100%"};
//   // min-width: ${(prop) =>
//     prop.isDragging ? `${prop.productWidth}px` : "100%"};

//   max-height: ${(prop) => (prop.isDragging ? `54.32px` : "100%")};
//   background: white;
//   border: ${(props) => (props.isDragging ? "1.5px solid #F36523" : "none")};
// `;
