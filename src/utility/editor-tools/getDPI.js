function getDPI() {
  const div = document.createElement("div");
  div.style.width = "1in";
  document.body.appendChild(div);
  const dpi = div.offsetWidth;
  document.body.removeChild(div);
  return dpi;
}

export default getDPI;
