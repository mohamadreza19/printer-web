import React, { Component } from "react";
import { connect } from "react-redux";
import { addEditEvent } from "../../redux/project/edit_event_slice";
import { addMultiCell } from "../../redux/project/multi_selectCell_slice";

class SelectArea extends Component {
  state = {
    isComponentMount: false,
  };

  componentDidMount() {
    this.mutateState("isComponentMount", true);
    const zoneArea = document.createElement("div");
    zoneArea.classList.add("select-area");
    zoneArea.id = "select-area";
    zoneArea.style.display = "block";
    document.body.appendChild(zoneArea);
  }
  componentWillUpdate(nextProps, nextState) {
    const { editMode } = nextProps;

    let firstPointX = 0;
    let firstPointY = 0;
    let secondPointX = 0;
    let secondPointY = 0;
    let isMouseDown = false;
    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;
    const zoneArea = document.getElementById("select-area");

    document.addEventListener("mousemove", (event) => {
      let width = 0;
      let height = 0;
      secondPointX = event.pageX;
      secondPointY = event.pageY;

      if (isMouseDown) {
        zoneArea.style.display = "block";

        const coordinates = {
          firstPointX,
          secondPointX,
          firstPointY,
          secondPointY,
        };

        if (secondPointX < firstPointX) {
          zoneArea.style.removeProperty("left");
          const distance = innerWidth - firstPointX;
          zoneArea.style.right = distance + "px";
        } else {
          zoneArea.style.removeProperty("right");

          zoneArea.style.left = firstPointX + "px";
        }

        if (secondPointY < firstPointY) {
          zoneArea.style.removeProperty("top");
          const distance = innerHeight - firstPointY;
          zoneArea.style.bottom = distance + "px";
        } else {
          zoneArea.style.removeProperty("bottom");
          zoneArea.style.top = firstPointY + "px";
        }

        if (firstPointX && secondPointX) {
          if (editMode === "SELECT_MODE") {
            this.handleSelectedItem(coordinates);
            width = Math.abs(firstPointX - secondPointX);
            height = Math.abs(firstPointY - secondPointY);
          }

          zoneArea.style.width = width + "px";
          zoneArea.style.height = height + "px";
        }
      } else {
        firstPointX = null;
        secondPointX = null;
        firstPointY = null;
        secondPointY = null;
      }
    });
    document.addEventListener("mousedown", (event) => {
      isMouseDown = true;
      firstPointX = event.pageX;
      firstPointY = event.pageY;
      // if (isMouseDown) {
      // zoneArea.style.left = firstPointX + "px";
      // zoneArea.style.top = firstPointY + "px";

      zoneArea.style.removeProperty("right");
      zoneArea.style.removeProperty("bottom");
      // }
    });
    document.addEventListener("mouseup", (event) => {
      isMouseDown = false;

      zoneArea.style.display = "none";
    });
    window.addEventListener("resize", (event) => {
      innerWidth = event.target.innerWidth;
      innerHeight = event.target.innerHeight;
    });
  }

  mutateState(key, value) {
    this.setState((draft) => ({ ...draft, [key]: value }));
  }
  handleSelectedItem(coordinates) {
    const { firstPointX, firstPointY, secondPointX, secondPointY } =
      coordinates;
    let selectedElements = [];

    const childs = document.querySelectorAll("[data-root-id]");

    for (var i = 0; i < childs.length; i++) {
      var childRect = childs[i].getBoundingClientRect();
      const is_element_include = this.is_elemet_in_coordinates(childRect, {
        firstPointX,
        secondPointX,
        firstPointY,
        secondPointY,
      });

      if (is_element_include) {
        selectedElements.push(childs[i]);
      }
    }

    this.dispatchSelecteditems(selectedElements);
  }
  is_elemet_in_coordinates(
    element,
    option = {
      firstPointX: 0,
      secondPointX: 0,
      firstPointY: 0,
      secondPointY: 0,
    }
  ) {
    let is_x_included = false;
    // let is_y_included = false;
    let is_y_included = false;
    let isIncluded = false;

    if (
      option.firstPointX <= element.left &&
      option.secondPointX >= element.right
    ) {
      is_x_included = true;
    }
    if (
      option.firstPointX >= element.right &&
      option.secondPointX - 7.34375 <= element.left
    ) {
      is_x_included = true;
    }

    if (
      option.firstPointY <= element.top &&
      option.secondPointY >= element.bottom
    ) {
      is_y_included = true;
    }
    if (
      option.firstPointY >= element.bottom &&
      option.secondPointY <= element.top
    ) {
      is_y_included = true;
    }

    if (is_x_included && is_y_included) {
      isIncluded = true;
    }

    return isIncluded;
  }

  dispatchSelecteditems(items = []) {
    let cellIds = [];

    let countRailIds = {};

    let mostRailIdRepeat;
    let repeatnumber;

    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      const cellId = element.attributes["data-root-id"].value;
      const railId = element.attributes["data-rail-id"].value;

      if (!Object.keys(countRailIds).includes(railId)) {
        countRailIds = { ...countRailIds, [railId]: 1 };
      } else {
        countRailIds = { ...countRailIds, [railId]: countRailIds[railId] + 1 };
      }

      for (let key in countRailIds) {
        if (!repeatnumber) {
          repeatnumber = countRailIds[key];
          mostRailIdRepeat = key;
        } else {
          if (repeatnumber < countRailIds[key]) {
            repeatnumber = countRailIds[key];
            mostRailIdRepeat = key;
          }
        }
      }

      if (railId === mostRailIdRepeat) {
        cellIds.push(cellId);
      }
    }
    const paylaod = { cellIds, mostRailIdRepeat };
    this.props.unSelectAll();
    this.props.multiSelect(paylaod);
  }

  render = () => null;
}

const mapDispatchToProps = (dispatch) => {
  return {
    multiSelect: (payload) => dispatch(addMultiCell(payload)),
    unSelectAll: () =>
      dispatch(
        addEditEvent({
          type: "UN_SELECT",
        })
      ),
  };
};
const mapStateToProps = (state) => {
  const { editMode } = state;
  return { editMode: editMode };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectArea);
