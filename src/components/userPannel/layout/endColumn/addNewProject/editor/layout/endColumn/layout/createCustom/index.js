import React, { useState } from "react";
import { useDynamicCssClass } from "../../../../../../../../../../recoil/readStore";
import Typography from "../../../../../../../../../../styles/__ready/Typography";
import styled from "styled-components";
import {
  Down,
  PlusPeoduct_Labels,
  Up,
} from "../../../../../../../../../../styles/__ready/EditorIcons";
import SelectNumberPlusBtn from "../../../../../../../../../../styles/__ready/common/SelectNumberPlusBtn";
import { useRecoilState } from "recoil";
import { rails } from "../../../../../../../../../../recoil/userEditorStore/cellsStore";
import userEditor_DnD from "../../../../../../../../../../helper/userEditor_DnD";

const CreateCustom = () => {
  const [railsObj, setRailsObj] = useRecoilState(rails);

  return <CreateCustomPoduct railsObj={railsObj} setRailsObj={setRailsObj} />;
};
const Input = styled.input`
  width: 105px;
  height: 38px;
  border-radius: 10px;
  padding: 5px;
`;

class CreateCustomPoduct extends React.Component {
  constructor(
    props = {
      setRailsObj: () => {},
      railsObj: {},
    }
  ) {
    super();
    this.state = {
      width: 0,
      height: 0,
      repeatNumber: 1,
      railToMove: 0,
    };
  }

  setWidth = (event) => {
    const width = Number(event.target.value);

    this.setState({ ...this.state, width });
  };
  setHeight = (event) => {
    const height = Number(event.target.value);

    this.setState({ ...this.state, height });
  };

  setRailToMove = (num) => {
    const railToMove = Number(num);
    this.setState({ ...this.state, railToMove });
  };
  getRailLength = () => {
    const railsLength = this.props.railsObj.present.length;
    return railsLength;
  };
  incresment_repeatNumber = () => {
    const repeatNumber = this.state.repeatNumber;
    this.setState({ ...this.state, repeatNumber: repeatNumber + 1 });
    // setCopyNumber(copyNumber + 1);
  };
  decrement_repeatNumber = () => {
    if (this.state.repeatNumber > 1) {
      const repeatNumber = this.state.repeatNumber;
      this.setState({ ...this.state, repeatNumber: repeatNumber - 1 });
    }
  };
  submit = () => {
    userEditor_DnD.create_customProduct(
      {
        state: this.props.railsObj,
        setState: this.props.setRailsObj,
      },
      this.state
    );
  };
  render() {
    return (
      <div style={{ paddingRight: "28px" }} className={"custom"}>
        <main
          style={{
            minHeight: "110px",
          }}
          className="d-flex align-items-center flex-column bg-white border-r-top-right-20 p-2"
        >
          <Typography.H6>ساخت Product Custom</Typography.H6>
          <div
            className="w-100 d-flex flex-wrap justify-content-center"
            style={{
              columnGap: "8px",
              rowGap: "8px",
            }}
          >
            <section
              style={{ columnGap: "5px", borderRadius: "10px" }}
              className="d-flex align-items-center"
            >
              <Typography.H9_5>عرض mm</Typography.H9_5>
              <Input
                value={this.state.width}
                onChange={this.setWidth}
                type="number"
              />
            </section>
            <section
              style={{ columnGap: "5px", borderRadius: "10px" }}
              className="d-flex align-items-center"
            >
              <Typography.H9_5>طول mm</Typography.H9_5>
              <Input
                value={this.state.height}
                onChange={this.setHeight}
                type="number"
              />
            </section>
            <section
              style={{
                position: "relative",
                right: "10px",
              }}
            >
              <SelectNumberPlusBtn
                listLength={this.getRailLength()}
                selectedItem={this.state.railToMove}
                setItemInList={this.setRailToMove}
                submit={this.submit}
                incresment={this.incresment_repeatNumber}
                decrement={this.decrement_repeatNumber}
                mutateValue={this.state.repeatNumber}

                // railsLength={railsLength}
              />
            </section>
          </div>
        </main>
      </div>
    );
  }
}

export default CreateCustom;
