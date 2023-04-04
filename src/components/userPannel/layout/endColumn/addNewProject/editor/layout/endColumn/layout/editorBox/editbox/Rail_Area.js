import Typography from "../../../../../../../../../../../styles/__ready/Typography";

export default function () {
  const Title = ({ children }) => {
    return (
      <Typography.H8 className="font-400 text-white-space-nowrap ms-4">
        {children}
      </Typography.H8>
    );
  };
  const CellsBox = ({ children, key }) => {
    return (
      <div key={key} className="edit-rail d-flex">
        {children}
      </div>
    );
  };
  const CellBox = ({ children }) => {
    return (
      <section
        style={{
          width: "71.23px",
          //   height: "54.32px",
        }}
        className="h-100  edit-rail-child-border position-relative"
      >
        <div className="edit-cell-caption-border"></div>
        <div className="edit-cell-caption-text-box">
          <p className="edit-cell-caption-text">Miniator circle braker F21</p>
        </div>
      </section>
    );
  };
  return (
    <div
      className="w-100 d-flex align-items-end mb-3"
      style={{
        height: "152.09px",
      }}
    >
      <article className="d-flex align-items-center">
        <Title children={"ریل اول"} />
        <CellsBox
          children={[1, 2, 3, 4].map((item, key) => (
            <CellBox key={item} />
          ))}
        />
      </article>
    </div>
  );
}
