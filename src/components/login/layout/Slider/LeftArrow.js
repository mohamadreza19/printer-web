export default function ({ language, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.301)",
        // opacity: "0.3",
        width: "2.5rem",
        height: "5rem",
        top: "5rem",
        position: "absolute",
        zIndex: 2,
        // right: language == "fa" ? "94.5%" : "0",
        right: "94%",
        borderTopRightRadius: "10rem",
        borderBottomRightRadius: "10rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "",
          top: "1.5rem",
          right: "0.5rem",
        }}
      >
        <svg
          width="2rem"
          height="2rem"
          viewBox="0 0 12 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.729528 15.5447C0.514365 15.2134 0.514365 14.7866 0.729528 14.4553L9.7871 0.510243C10.3294 -0.3247 11.6257 0.0593399 11.6257 1.05495L11.6257 28.9451C11.6257 29.9407 10.3294 30.3247 9.7871 29.4898L0.729528 15.5447Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
