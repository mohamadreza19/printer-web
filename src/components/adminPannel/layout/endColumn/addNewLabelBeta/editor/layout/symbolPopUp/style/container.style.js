import styled from "styled-components";

export const Container = styled.div`
  display: ${(props) => (props.showSymbol ? "flex" : "none")};
  position: absolute;
  z-index: 10;
  right: 70px;
  ${(props) => (props.language === "fa" ? "right: 70px;" : "left: 70px;")}
  top: 15px;
  justify-content: start;
`;
