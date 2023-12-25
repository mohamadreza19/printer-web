import shortid from "shortid";

export default class {
  static create_customLabel(
    findedRail = { frontId: "", customLabels: [] },
    findedProduct = { frontId: "", width: "", description: {} },
    destination = { index: "" },
    presentRails,
    copyNumber = 1
  ) {
    const copyCells = [...findedRail.customLabels];
    const frontId = shortid.generate();
    const newCell = {
      productId: findedProduct.id,
      frontId: frontId,
      structure: {
        frontId: frontId,
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

      product: findedProduct,
    };
    copyCells.splice(destination.index, 0, newCell);
    const newRails = presentRails.map((rail) => {
      if (rail.frontId == findedRail.frontId) {
        return { ...rail, customLabels: copyCells };
      }
      return rail;
    });
    return newRails;
  }
  static create_rail_with_customLabel(
    product,
    railArr = [],
    option = {
      numberOfCopy: 0,
      selectedRail: 0,
    }
  ) {
    let mapedProduct = [];

    for (let i = 0; i < option.numberOfCopy; i++) {
      const frontId = shortid.generate();
      mapedProduct.push({
        productId: product.id,
        frontId: frontId,
        structure: {
          frontId: frontId,
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

        product: product,
      });
    }

    const mapedRail = railArr.map((rail, index) => {
      if (index === option.selectedRail) {
        console.log({ rail });
        return (rail = {
          ...rail,
          customLabels: rail.customLabels.concat(mapedProduct),
        });
      }
      return rail;
    });

    return mapedRail;
  }

  static reorderCell(
    findedRail = { customLabels: [], frontId: "" },
    draggableId = "",
    destination = { index: "" },
    source = { index: "" },
    railsArrayPresent = []
  ) {
    const copyCells = [...findedRail.customLabels];
    const cellFinded = copyCells.find(
      (cell) => cell.structure.frontId === draggableId
    );
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
