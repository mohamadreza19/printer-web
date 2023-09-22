import styled from "styled-components";

export default styled.div`
  position: relative;
  width: ${(props) => `${props.cellWidth}mm`};
  min-width: ${(props) => `${props.cellWidth}mm`};
  height: ${(props) => `${props.cellWidthOfPrintingArea}mm`};
  min-height: ${(props) => `${props.cellWidthOfPrintingArea}mm`};
`;
