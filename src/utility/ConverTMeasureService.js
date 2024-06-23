class ConverTMeasureService {
  #DPI = 0;
  #mmToInches = 25.4;

  constructor(dpi = 96) {
    this.#DPI = dpi;
  }

  mmToPx(mm) {
    var calculatedDpi = window.devicePixelRatio * this.#DPI;
    return (mm * calculatedDpi) / this.#mmToInches;
  }
}

export default ConverTMeasureService;
