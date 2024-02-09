import { Component } from "react";
import { connect } from "react-redux";
import { addEditEvent } from "../../redux/project/edit_event_slice";

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
    this.initalSelectArea();
    this.mouseMove();
    this.mouseDown();
    this.mouseUp();
    this.changeInnerDimensionBasedScreenResize();
  }
  componentWillUpdate(nextProps, nextState) {
    // console.log("this.state.innerWidth" + this.state.innerWidth);
    console.log("this.state.firstPointX" + this.state.firstPointX);
    console.log("this.state.secondPointX" + this.state.secondPointX);
    // console.log("this.state.innerHeight" + this.state.innerHeight);
    // console.log("this.state.firstPointY" + this.state.firstPointY);
    // console.log("this.state.secondPointY" + this.state.secondPointY);
    // console.log("firstPointInState" + nextState.firstPointX);
  }
  mouseMove() {
    document.addEventListener("mousemove", (event) => {
      //   this.restState();
      //   console.log("secondPoint" + event.pageX);

      this.mutateState("secondPointX", event.pageX);
      this.mutateState("secondPointY", event.pageY);
      if (this.state.isMouseDown) {
        if (this.state.secondPointX < this.state.firstPointX) {
          this.getSelectArea().style.removeProperty("left");

          const distance = this.state.innerWidth - this.state.firstPointX;

          this.getSelectArea().style.right = distance + "px";
        } else {
          this.getSelectArea().style.removeProperty("right");
          this.getSelectArea().style.left = this.state.firstPointX + "px";
        }

        if (this.state.secondPointY < this.state.firstPointY) {
          this.getSelectArea().style.removeProperty("top");
          const distance = this.state.innerHeight - this.state.firstPointY;
          this.getSelectArea().style.bottom = distance + "px";
        } else {
          this.getSelectArea().style.removeProperty("bottom");
          this.getSelectArea().style.top = this.state.firstPointY + "px";
        }
        const width = Math.abs(
          this.state.firstPointX - this.state.secondPointX
        );
        const height = Math.abs(
          this.state.firstPointY - this.state.secondPointY
        );
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
      this.mutateState("event", "mousedown");
      //   console.log("firstPoint" + event.pageX);
      this.mutateState("isMouseDown", true);
      this.mutateState("firstPointX", event.pageX);
      this.mutateState("firstPointY", event.pageY);

      this.getSelectArea().style.left = this.state.firstPointX + "px";
      this.getSelectArea().style.top = this.state.firstPointY + "px";

      this.getSelectArea().style.display = "block";
      this.getSelectArea().style.removeProperty("right");
      this.getSelectArea().style.removeProperty("bottom");
    });
  }
  mouseUp() {
    document.addEventListener("mouseup", (event) => {
      console.log("is");

      //   this.getSelectArea().remove();

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
  restState() {
    this.mutateState("firstPointX", 0);
    this.mutateState("firstPointY", 0);
    this.mutateState("secondPointX", 0);
    this.mutateState("secondPointY", 0);
    // this.getSelectArea().style.width = 0;
    // this.getSelectArea().style.height = 0;
    // this.getSelectArea().style.display = "none";
  }
  render = () => null;
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectAll: (payload) => dispatch(addEditEvent(payload)),
  };
};

export default connect(null, mapDispatchToProps)(SelectArea);
