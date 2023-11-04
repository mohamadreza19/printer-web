import Typography from "../../../../../../../../../../../../styles/__ready/Typography";

export default function ({ children }) {
  return (
    <div className="position-relative ms-4">
      <Typography.H8 className="position-absolute font-400 text-white-space-nowrap right-_15">
        {children}
      </Typography.H8>
    </div>
  );
}
