class MeasurementService {
  #dpi;
  #basedDpi;
  #oldBorderWidthInPx;

  constructor(dpi = 203, basedDpi = 96, oldBorderWidthInPx = 1) {
    this.#dpi = window.devicePixelRatio * dpi;
    this.#basedDpi = basedDpi;
    this.#oldBorderWidthInPx = oldBorderWidthInPx;
  }

  mmToPx(mm) {
    const value = (mm * this.#dpi) / 25.4;

    return Math.round(value);
  }
  borderWidthBasedDpi() {
    const value = (this.#dpi / this.#basedDpi) * this.#oldBorderWidthInPx;
    return Math.round(value);
  }
}

export default MeasurementService;
