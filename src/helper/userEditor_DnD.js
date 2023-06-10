import shortid from "shortid";

export default class {
  static createCellFrom_Drag_Product(
    findedRail = { frontId: "", customLabels: [] },
    findedProduct = { frontId: "", width: "", description: {} },
    destination = { index: "" },
    railsArrayPresent
  ) {
    const copyCells = [...findedRail.customLabels];
    const newCell = {
      frontId: shortid.generate(),
      productId: findedProduct.id,
      structure: {
        isQrcode: false,
        isBarcode: false,
        isSelected: false,
        split: "none",
        content: {
          text: "",
          style: {
            fontFamily: "Arial",
            fontSize: "14",
            angle: "0",
            textAlign: "none",
            fontStyle: "regular",
            margin: 0,
            padding: 0,
          },
        },
      },
      product: {
        width: findedProduct.width,
        description: findedProduct.description.english,
      },
    };
    copyCells.splice(destination.index, 0, newCell);
    const newRails = railsArrayPresent.map((rail) => {
      if (rail.frontId == findedRail.frontId) {
        return { ...rail, customLabels: copyCells };
      }
      return rail;
    });
    return newRails;
  }
  static reorderCell(
    findedRail = { customLabels: [], frontId: "" },
    draggableId = "",
    destination = { index: "" },
    source = { index: "" },
    railsArrayPresent = []
  ) {
    const copyCells = [...findedRail.customLabels];
    const cellFinded = copyCells.find((cell) => cell.frontId === draggableId);
    copyCells.splice(source.index, 1);
    copyCells.splice(destination.index, 0, cellFinded);
    const newRails = railsArrayPresent.map((rail) => {
      if (rail.frontId == findedRail.frontId) {
        return { ...rail, customLabels: copyCells };
      }
      return rail;
    });
    return newRails;
  }
}
