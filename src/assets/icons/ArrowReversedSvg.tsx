export default function ArrowReversedSvg({
  classes = "stroke-current fill-none stroke-2 ",
  rotate = false,
}) {
  return (
    <div
      className={`pointer-events-none h-full w-full ${
        rotate ? "rotate-180" : ""
      }`}
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
          d="M 24.861824,8.1876512 C 13.444202,8.3938123 9.202291,12.52355 16.727618,25.685276"
          className={classes}
        />
        <path
          d="M 20.54547,21.88848 17.422599,27.421201 9.4880716,23.565128"
          className={classes}
        />
      </svg>
    </div>
  );
}
