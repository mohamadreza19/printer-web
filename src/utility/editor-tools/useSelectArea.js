import { Component } from "react";
import { connect } from "react-redux";
import { addEditEvent } from "../../redux/project/edit_event_slice";
import { addMultiCell } from "../../redux/project/multi_selectCell_slice";

class SelectArea extends Component {
  state = {
    event: "mouseup",
    width: 0,
    height: 0,
    firstPointX: 0,
    firstPointY: 0,
    secondPointX: 0,
    secondPointY: 0,
    isMouseDown: false,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  };

  componentDidMount() {
    let width = 0;
    let height = 0;
    let firstPointX = 0;
    let firstPointY = 0;
    let secondPointX = 0;
    let secondPointY = 0;
    let isMouseDown = false;
    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;
    const zoneArea = document.createElement("div");
    zoneArea.classList.add("select-area");

    zoneArea.style.display = "block";
    document.body.appendChild(zoneArea);
    document.addEventListener("mousemove", (event) => {
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
        this.handleSelectedItem(coordinates);

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
          width = Math.abs(firstPointX - secondPointX);
          height = Math.abs(firstPointY - secondPointY);
          zoneArea.style.width = width + "px";
          zoneArea.style.height = height + "px";
        }

        // console.log({ firstPointY });
        // console.log({ secondPointY });
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
  componentWillUpdate(nextProps, nextState) {
    // console.log("this.state.innerWidth" + this.state.innerWidth);
    // console.log("this.state.firstPointX" + this.state.firstPointX);
    // console.log("this.state.secondPointX" + this.state.secondPointX);
    // console.log("this.state.innerHeight" + this.state.innerHeight);
    // console.log("this.state.firstPointY" + this.state.firstPointY);
    // console.log("this.state.secondPointY" + this.state.secondPointY);
    // console.log("firstPointInState" + nextState.firstPointX);
    const coordinates = {
      firstPointX: this.state.firstPointX,
      secondPointX: this.state.secondPointX,
      firstPointY: this.state.firstPointY,
      secondPointY: this.state.secondPointY,
    };
    this.handleSelectedItem(coordinates);
  }
  mouseMove() {
    let width = 0;
    let height = 0;
    document.addEventListener("mousemove", (event) => {
      this.mutateState("event", "mousemove");
      //   this.restState();
      //   console.log("secondPoint" + event.pageX);

      this.mutateState("secondPointX", event.pageX);
      this.mutateState("secondPointY", event.pageY);
      if (this.state.isMouseDown) {
        this.getSelectArea().style.display = "block";

        // console.log(this.state.secondPointX < this.state.firstPointX);
        // console.log(this.state.firstPointX);
        // console.log(this.state.secondPointX);
        if (this.state.secondPointX < this.state.firstPointX) {
          this.getSelectArea().style.removeProperty("left");

          const distance = this.state.innerWidth - this.state.firstPointX;

          // this.getSelectArea().style.right = distance + "px";
        } else {
          // this.getSelectArea().style.removeProperty("right");
          // this.getSelectArea().style.left = this.state.firstPointX + "px";
        }

        if (this.state.secondPointY < this.state.firstPointY) {
          this.getSelectArea().style.removeProperty("top");
          const distance = this.state.innerHeight - this.state.firstPointY;
          this.getSelectArea().style.bottom = distance + "px";
        } else {
          this.getSelectArea().style.removeProperty("bottom");
          this.getSelectArea().style.top = this.state.firstPointY + "px";
        }

        if (this.state.firstPointX && this.state.secondPointX) {
          console.log("firstPointX" + this.state.firstPointX);
          console.log("secondPointX" + this.state.secondPointX);
          setTimeout(() => {
            console.log(" setTimeout");
            console.log("firstPointX" + this.state.firstPointX);
            console.log("secondPointX" + this.state.secondPointX);
          }, 2000);
          width = Math.abs(this.state.firstPointX - this.state.secondPointX);
        }
        if (this.state.firstPointY && this.state.secondPointY) {
          height = Math.abs(this.state.firstPointY - this.state.secondPointY);
        }

        // console.log({ distance });

        this.getSelectArea().style.width = width + "px";
        this.getSelectArea().style.height = height + "px";
      } else {
        this.restState();
      }
    });
  }

  mouseDown() {
    document.addEventListener("mousedown", (event) => {
      // this.mutateState("event", "mousedown");

      this.mutateState("isMouseDown", true);
      this.mutateState("firstPointX", event.pageX);
      this.mutateState("firstPointY", event.pageY);

      // this.getSelectArea().style.left = this.state.firstPointX + "px";
      // this.getSelectArea().style.top = this.state.firstPointY + "px";

      this.getSelectArea().style.removeProperty("right");
      this.getSelectArea().style.removeProperty("bottom");
    });
  }
  mouseUp() {
    document.addEventListener("mouseup", (event) => {
      this.mutateState("event", "mouseup");

      // this.getSelectArea().style.display = "none";

      this.mutateState("isMouseDown", false);
      this.restState();

      //   this.initalSelectArea();
    });
  }
  changeInnerDimensionBasedScreenResize() {
    window.addEventListener("resize", (event) => {
      this.mutateState("innerWidth", event.target.innerWidth);
      this.mutateState("innerHeight", event.target.innerHeight);
    });
  }
  initalSelectArea() {
    const selectArea = document.createElement("div");
    selectArea.classList.add("select-area");
    selectArea.style.display = "block";
    selectArea.id = "select-zone";
    document.body.appendChild(selectArea);
  }
  getSelectArea() {
    return document.getElementById("select-zone");
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
  restState() {
    this.mutateState("firstPointX", null);
    this.mutateState("firstPointY", null);
    this.mutateState("secondPointX", null);
    this.mutateState("secondPointY", null);
    this.getSelectArea().style.width = 0;
    this.getSelectArea().style.height = 0;
    this.getSelectArea().style.display = "none";
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

export default connect(null, mapDispatchToProps)(SelectArea);
