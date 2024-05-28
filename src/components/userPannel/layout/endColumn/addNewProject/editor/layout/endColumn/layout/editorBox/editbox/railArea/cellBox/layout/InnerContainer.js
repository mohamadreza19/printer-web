import styled from "styled-components";

export default styled.div`
  position: relative;
  width: ${(props) => `${props.cellWidth}mm !important`};
  min-width: ${(props) => `${props.cellWidth}mm !important`};
  max-width: ${(props) => `${props.cellWidth}mm !important`}
  height: ${(props) => `${props.cellWidthOfPrintingArea}mm`};
  min-height: ${(props) => `${props.cellWidthOfPrintingArea}mm`};
`;
