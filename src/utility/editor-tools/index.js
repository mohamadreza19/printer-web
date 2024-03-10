import shortid from 'shortid';
import selectedCell from '../../redux/project/selectedCell';

export class PayloadCenter {
  selectedCellStyleHandeler = () => {};
  _event = {
    type: '',
    itemId: '',
    value: '',
    symbolId: '',
  };

  static setEvent(payload) {
    this._event = payload;
  }
  static setSelectedCellStyleHandeler(handeler = () => {}) {
    this.selectedCellStyleHandeler = handeler;
  }
  static get event() {
    return this._event;
  }
  static getSelectedCellStyleHandeler() {
    return this._;
  }
}
export class CellTool {
  cellId = '';
  action = '';
  #structure;
  constructor(structure = {}) {
    this.#structure = structure;
  }
  // <OPREATORS
  get SELECT() {
    return {
      _target: { ...this.#structure, isSelected: true },
      _else: { ...this.#structure, isSelected: false },
    };
  }
  get UN_SELECT() {
    const structure = this.#structure;
    return {
      _target: { ...structure, isSelected: false },
      _else: { ...structure, isSelected: false },
    };
  }
  get VIEW() {
    const structure = this.#structure;

    return {
      _target: { ...structure, isSelected: false },
      _else: { ...structure, isSelected: false },
    };
  }
  get ['SPLIT/COLUMN']() {
    const structure = this.#structure;

    const target = {
      ...structure,
      split: 'vertical',
      children: [
        {
          rootId: structure.rootId,
          split: 'none',

          frontId: shortid.generate(),
          content: {
            text: '',
            style: structure.content.style,
          },
          isSelected: false,
        },
        {
          rootId: structure.rootId,
          split: 'none',

          frontId: shortid.generate(),
          content: {
            text: '',
            style: structure.content.style,
          },
          isSelected: false,
        },
      ],
    };
    return {
      _target: target,
      _else: this.#structure,
    };
  }

  get ['SPLIT/ROW']() {
    const structure = this.#structure;
    const target = {
      ...structure,
      split: 'horizontal',
      children: [
        {
          rootId: structure.rootId,
          split: 'none',

          frontId: shortid.generate(),
          content: {
            text: '',
            style: structure.content.style,
          },
          isSelected: false,
        },
        {
          rootId: structure.rootId,
          split: 'none',

          frontId: shortid.generate(),
          content: {
            text: '',
            style: structure.content.style,
          },
          isSelected: false,
        },
      ],
    };
    return {
      _target: target,
      _else: this.#structure,
    };
  }
  get ['JOIN/COLUMN']() {
    const target = undefined;
    return {
      _target: target,
      _else: this.#structure,
    };
  }
  get ['JOIN/ROW']() {
    const target = undefined;
    return {
      _target: target,
      _else: this.#structure,
    };
  }
  get REVERSE() {
    return {
      _target: this.#structure,
      _else: this.#structure,
    };
  }
  get ['CONTENT/NEW']() {
    const structure = this.#structure;
    let value = PayloadCenter.event.value;
    const target = {
      ...structure,
      content: {
        ...structure.content,
        text: value,
      },
    };
    return {
      _target: target,
      _else: this.#structure,
    };
  }

  get SETSYMBOL() {
    const structure = this.#structure;

    const target = {
      ...structure,
      symbolId: PayloadCenter.event.symbolId,
    };
    return {
      _target: target,
      _else: this.#structure,
    };
  }
  get DELETESYMBOL() {
    const structure = { ...this.#structure };
    delete structure.symbolId;

    return {
      _target: structure,
      _else: this.#structure,
    };
  }
  get SETFONT() {
    const structure = this.#structure;

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            fontFamily: PayloadCenter._cunstomLabelStructureObj,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get ['FONT/CHANGE']() {
    const structure = this.#structure;
    let font = PayloadCenter.event.value;
    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            fontFamily: font,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get ['FONT/STYLE']() {
    const structure = this.#structure;
    let style = PayloadCenter.event.value;
    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            fontStyle: style,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get ['FONT/ALIGN']() {
    const structure = this.#structure;
    let textAlign = PayloadCenter.event.value;
    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            textAlign: textAlign,
          },
        },
      },
      _else: this.#structure,
    };
  }

  get TEXTALIGN() {
    const structure = this.#structure;

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            textAlign: PayloadCenter._cunstomLabelStructureObj,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get ['ANGLE/INCREMENT']() {
    const structure = this.#structure;
    let newAngle = structure.content.style.angle;
    newAngle = Number(newAngle) + 1;

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            angle: newAngle,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get ['ANGLE/DECREMENT']() {
    const structure = this.#structure;
    let newAngle = structure.content.style.angle;

    newAngle = Number(newAngle) - 1;

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            angle: newAngle,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get ANGLE() {
    const structure = this.#structure;

    let cellFontAngle = PayloadCenter.event.value;

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            angle: cellFontAngle,
          },
        },
      },
      _else: this.#structure,
    };
  }

  get ['TEXTSIZE/INCREMENT']() {
    const structure = this.#structure;
    let newFontSize = structure.content.style.fontSize;
    newFontSize = Number(newFontSize) + 1;

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            fontSize: newFontSize,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get ['TEXTSIZE/DECREMENT']() {
    const structure = this.#structure;
    let newFontSize = structure.content.style.fontSize;

    newFontSize = Number(newFontSize) - 1;

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            fontSize: newFontSize,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get TEXTSIZE() {
    const structure = this.#structure;

    let newFontSize = PayloadCenter.event.value;

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            fontSize: newFontSize,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get ['MARGIN/INCREMENT']() {
    const structure = this.#structure;
    let newMargin = structure.content.style.margin;

    newMargin = Number(newMargin) + 1;

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            margin: newMargin,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get ['MARGIN/DECREMENT']() {
    const structure = this.#structure;
    let newMargin = structure.content.style.margin;

    newMargin = Number(newMargin) - 1;

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            margin: newMargin,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get MARGIN() {
    const structure = this.#structure;

    let newMargin = PayloadCenter.event.value;

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            margin: newMargin,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get ['PADDING/INCREMENT']() {
    const structure = this.#structure;
    let newPadding = structure.content.style.padding;

    newPadding = Number(newPadding) + 1;

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            padding: newPadding,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get ['PADDING/DECREMENT']() {
    const structure = this.#structure;
    let newPadding = structure.content.style.padding;

    newPadding = Number(newPadding) - 1;

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            padding: newPadding,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get PADDING() {
    const structure = this.#structure;
    console.log(PayloadCenter.event);
    let newPadding = PayloadCenter.event.value;

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            padding: newPadding,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get DELETECELL() {
    return {
      _target: undefined,
      _else: this.#structure,
    };
  }
  get DUPLICATECELL() {
    return {
      _target: this.#structure,
      _else: this.#structure,
    };
  }
  get ISBACODE() {
    return {
      _target: { ...this.#structure, isBarcode: !this.#structure.isBarcode },
      _else: this.#structure,
    };
  }
  get QRCODE() {
    return {
      _target: { ...this.#structure, isQrcode: !this.#structure.isQrcode },
      _else: this.#structure,
    };
  }

  static getClear_structure_from_undefined_children(
    structure = { children: [] }
  ) {
    let is_children_undefined = false;

    const children = structure.children;

    children.forEach((child) => {
      if (child === undefined) is_children_undefined = true;
    });

    if (is_children_undefined) {
      return {
        ...structure,
        split: 'none',
        children: null,
      };
    } else return structure;
  }
}

export class Structure {
  #structure = { split: '' };
  constructor(
    structure = {
      split: '',
    }
  ) {
    this.#structure = structure;
  }

  get structure() {
    const splitType = this.#structure.split;

    return this[splitType](this.#structure);
  }
  none(structure) {
    const { _target, _else } = new CellTool(structure)[
      PayloadCenter.event.type
    ];

    if (PayloadCenter.event.itemId) {
      switch (structure.frontId === PayloadCenter.event.itemId) {
        case true:
          if (
            PayloadCenter.event.type !== 'JOIN/COLUMN' &&
            PayloadCenter.event.type !== 'JOIN/ROW' &&
            PayloadCenter.event.type !== 'DELETECELL'
          ) {
          }
          return _target;

        case false:
          return _else;
      }
    }

    return _else;
  }
  vertical(structure) {
    const mapedChildren = structure.children.map((child) => {
      const childSplitType = child.split;

      return this[childSplitType](child);
    });

    const newStructure = {
      ...structure,
      children: mapedChildren,
    };
    return CellTool.getClear_structure_from_undefined_children(newStructure);
  }
  horizontal(structure) {
    const mapedChildren = structure.children.map((child) => {
      const childSplitType = child.split;
      return this[childSplitType](child);
    });
    const newStructure = {
      ...structure,
      children: mapedChildren,
    };
    return CellTool.getClear_structure_from_undefined_children(newStructure);
  }
}
export class CustomLabel {
  #_customLabel = {
    split: '',
    structure: {},
  };
  constructor(
    customLabel = {
      structure: {},
    }
  ) {
    // if (
    //   PayloadCenter.event.type === "JOIN/COLUMN" ||
    //   PayloadCenter.event.type === "JOIN/ROW"
    // ) {
    //   if (customLabel.structure.split === "none") {
    //     PayloadCenter.event.itemId = "";
    //   }
    // }
    this.#_customLabel = {
      ...customLabel,
      structure: new Structure(customLabel.structure).structure,
    };
  }

  get customLabel() {
    return this.#_customLabel;
  }
}
export class CustomLabels {
  #_customLabels = [];
  constructor(customLabels = []) {
    if (PayloadCenter.event.type !== 'DUPLICATECELL') {
      this.#_customLabels = customLabels.map(
        (customLabel) => new CustomLabel(customLabel).customLabel
      );
    } else {
      this.#_customLabels = customLabels;
    }
  }

  get customLabels() {
    const cleanCustomLabels = this.#_customLabels.filter(
      (customLabel) => customLabel.structure !== undefined
    );

    if (PayloadCenter._action === 'REVERSE') {
      return this.reverse(cleanCustomLabels);
    }
    if (PayloadCenter.event.type === 'DUPLICATECELL') {
      const rootId = PayloadCenter.event.itemId;
      const findedIndex = cleanCustomLabels.findIndex(
        (customLabel) => customLabel.structure.rootId === rootId
      );

      if (findedIndex >= 0) {
        function cellSplitController(cell) {
          const newRootId = shortid.generate();
          function fullCellChecker(cellForCheck) {
            const commonId = shortid.generate();
            return {
              ...cellForCheck,
              rootId: newRootId,
              frontId: commonId,
              structure: {
                ...cellForCheck.structure,
                isSelected: false,
                frontId: commonId,
              },
            };
          }
          function verticalCellChecker(cellForCheck) {
            const mapedChildren = cellForCheck.structure.children.map(
              (child) => {
                if (
                  child.split == 'none' ||
                  child?.structure?.split == 'none'
                ) {
                  return fullCellChecker(child);
                }
                if (child.split == 'vertical') {
                  return verticalCellChecker(child);
                }
                if (child.split == 'horizontal') {
                  return horizontalCellChecker(child);
                }
                return child;
              }
            );

            return {
              ...cellForCheck,
              rootId: newRootId,
              frontId: shortid.generate(),
              children: mapedChildren,
            };
          }
          function horizontalCellChecker(cellForCheck) {
            const mapedChildren = cellForCheck.structure.children.map(
              (child) => {
                if (child.structure.split == 'none') {
                  return fullCellChecker(child);
                }
                if (child.structure.split == 'vertical') {
                  return verticalCellChecker(child);
                }
                if (child.structure.split == 'horizontal') {
                  return horizontalCellChecker(child);
                }
                return child;
              }
            );

            return {
              ...cellForCheck,
              rootId: newRootId,
              frontId: shortid.generate(),
              children: mapedChildren,
            };
          }

          if (cell.structure.split == 'none') {
            return fullCellChecker(cell);
          }
          if (cell.structure.split == 'vertical') {
            return verticalCellChecker(cell);
          }
          if (cell.structure.split == 'horizontal') {
            return horizontalCellChecker(cell);
          }
        }
        let newCell = cleanCustomLabels[findedIndex];

        newCell = cellSplitController(newCell);

        const copyCells = [...cleanCustomLabels];

        copyCells.splice(findedIndex, 0, newCell);

        return copyCells;
      }
      return cleanCustomLabels;
    }
    return cleanCustomLabels;
  }
  reverse(customLabels = []) {
    return [...customLabels].reverse();
  }
}
export class Rail {
  rail = {};
  constructor(
    rail = {
      customLabels: [],
    }
  ) {
    // console.log({ rail });
    const newCustomLabels = new CustomLabels(rail.customLabels).customLabels;

    this.rail = {
      ...rail,
      customLabels: newCustomLabels,
    };
    // this.rail = this.listen_To_Action(rail);
  }
}
export class Rails {
  railsArr = [];
  constructor(railsArr = []) {
    this.railsArr = railsArr.map((rail) => new Rail(rail).rail);
  }
}
export class SelectParntAndChilds {
  structure;
  constructor(structure) {
    this.structure = structure;
  }

  getNewStructure() {
    const splitType = this.structure.split;

    return this[splitType](this.structure);
  }
  none(structure) {
    return { ...structure, isSelected: true };
  }
  vertical(structure) {
    const mapedChildren = structure.children.map((child) => {
      const childSplitType = child.split;

      return this[childSplitType](child);
    });

    const newStructure = {
      ...structure,
      children: mapedChildren,
    };
    return newStructure;
  }
  horizontal(structure) {
    const mapedChildren = structure.children.map((child) => {
      const childSplitType = child.split;
      return this[childSplitType](child);
    });
    const newStructure = {
      ...structure,
      children: mapedChildren,
    };

    return newStructure;
  }
}
