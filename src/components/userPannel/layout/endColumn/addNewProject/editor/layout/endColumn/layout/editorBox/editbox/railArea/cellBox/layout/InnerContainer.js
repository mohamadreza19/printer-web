import styled from "styled-components";

export default styled.div`
  position: relative;
  width: ${(props) => `${props.cellWidth}px`};
  min-width: ${(props) => `${props.cellWidth}px`};
`;
