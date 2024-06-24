import getDPI from "./getDPI";

function mmToPx(mm) {
  const dpi = getDPI();
  return (mm / 25.4) * dpi;
}
export default mmToPx;
