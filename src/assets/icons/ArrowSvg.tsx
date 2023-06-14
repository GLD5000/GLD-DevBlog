export default function ArrowSvg({
  classes = "stroke-current fill-none stroke-2 ",
  rotate = false,
}) {
  return (
    <div
      className={`pointer-events-none h-full w-full ${rotate ? "rotate-180" : ""}`}
    >
      <svg
        style={{
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
        id="add-svg"
        role="img"
        aria-label="Add Section"
        height="100%"
        width="100%"
        viewBox="0 0 32 32"
      >
        <path
          d="M 9.4642325,8.1889696 C 24.540041,8.2513396 22.788125,16.505811 17.59427,25.661446"
          className={classes}
        />
        <path
          d="m 13.779473,21.878791 3.040688,5.551494 8.026397,-3.864384"
          className={classes}
        />
      </svg>
    </div>
  );
}
