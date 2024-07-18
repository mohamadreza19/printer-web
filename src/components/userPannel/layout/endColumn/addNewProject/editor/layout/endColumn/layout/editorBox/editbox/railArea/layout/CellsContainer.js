import styled from 'styled-components';
import MeasurementService from '../../../../../../../../../../../../../utility/MeasurementService';
const measurementService = new MeasurementService();
export const Container = styled.div`
  background-color: ${(props) => (props.isDragingOver ? '#F36523' : '#CBCBCB')};
  height: ${(prop) => prop.railsWidth}px;
  display: flex;
  min-width: 100px;
  // padding-right:${(prop) => (prop.railsLength ? '0' : '40px')}
  width: ${(prop) => prop.railsLength}mm;
  // border-collapse: collapse;
  // bottom: ${(prop) => prop.bottom}px;
`;
// flex-direction: ${(prop) =>
//   prop.justify == "right" ? "row-reverse" : "row"};
