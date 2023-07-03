export default function SignInSvg({
  classes = "stroke-2 stroke-current fill-current ",
}) {
  return (
    <div className="pointer-events-none my-auto h-full w-full rounded-none">
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
          d="m 16,5 c -2.761424,0 -5,2.2385763 -5,5 0,2.761424 2.238576,5 5,5 2.761424,0 5,-2.238576 5,-5 0,-2.7614237 -2.238576,-5 -5,-5 z m 0,12 c -1.755376,3e-5 -3.479817,0.262907 -5,1.140625 -3.0939804,1.78631 -4.999965,5.087535 -5,8.660156 H 16 26 C 25.999965,23.22816 24.09398,19.926935 21,18.140625 19.479817,17.262907 17.755376,17.00003 16,17 Z"
          className={classes}
        />
      </svg>
    </div>
  );
}
