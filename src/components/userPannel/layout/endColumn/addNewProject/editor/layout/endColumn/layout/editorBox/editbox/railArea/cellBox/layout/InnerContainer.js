import styled from 'styled-components';

export default styled.td`
  position: relative;
  width: ${(props) => `${props.cellWidth}px`};
  max-width: ${(props) => `${props.cellWidth}px`};

  min-width: ${(props) => `${props.cellWidth}px`};
  height: ${(props) => `${props.cellWidthOfPrintingArea}mm`};
  min-height: ${(props) => `${props.cellWidthOfPrintingArea}mm`};
  // border: ${(props) => props.borderWidth}px solid black;
`;
