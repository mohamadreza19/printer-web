import styled from 'styled-components';

export default styled.div`
  position: relative;
  // width: ${(props) => `${props.cellWidth}mm !important`};
  // min-width: ${(props) => `${props.cellWidth}mm !important`};
  // max-width: ${(props) => `${props.cellWidth}mm !important`}
  width: ${(props) => `${props.cellWidth}px !important`};
  min-width: ${(props) => `${props.cellWidth}px !important`};
  max-width: ${(props) => `${props.cellWidth}px !important`}

  border:
  // height: ${(props) => `${props.cellWidthOfPrintingArea}mm`};
  // min-height: ${(props) => `${props.cellWidthOfPrintingArea}mm`};

  height: ${(props) => `${props.cellWidthOfPrintingArea}px`};
  min-height: ${(props) => `${props.cellWidthOfPrintingArea}px`};
  // height: 112px;
`;
