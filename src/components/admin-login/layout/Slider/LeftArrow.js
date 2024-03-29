export default function ({ language, onClick }) {
  return (
    <div onClick={onClick} className="footer-slider-left-arrow">
      <div className="d-flex  justify-content-center align-items-center w-100 h-100">
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
