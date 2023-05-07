import shortid from "shortid";

export default class {
  static createCellFrom_Drag_Product(
    findedRail = { id: "", cells: [] },
    findedProduct = { id: "", width: "" },
    destination = { index: "" },
    railsArrayPresent
  ) {
    const copyCells = [...findedRail.cells];
    const newCell = {
      id: shortid.generate(),
      productId: findedProduct.id,
      split: "none",
      content: {
        values: "",
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
      wantBarcode: false,
      wantQr: false,
      width: findedProduct.width,
      isSelected: false,
    };
    copyCells.splice(destination.index, 0, newCell);
    const newRails = railsArrayPresent.map((rail) => {
      if (rail.id == findedRail.id) {
        return { ...rail, cells: copyCells };
      }
      return rail;
    });
    return newRails;
  }
  static reorderCell(
    findedRail = { cells: [], id: "" },
    draggableId = "",
    destination = { index: "" },
    source = { index: "" },
    railsArrayPresent = []
  ) {
    const copyCells = [...findedRail.cells];
    const cellFinded = copyCells.find((cell) => cell.id === draggableId);
    copyCells.splice(source.index, 1);
    copyCells.splice(destination.index, 0, cellFinded);
    const newRails = railsArrayPresent.map((rail) => {
      if (rail.id == findedRail.id) {
        return { ...rail, cells: copyCells };
      }
      return rail;
    });
    return newRails;
  }
}
