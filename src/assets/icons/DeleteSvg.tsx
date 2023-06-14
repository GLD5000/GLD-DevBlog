export default function DeleteSvg({
  classes = "stroke-current fill-none stroke-2",
}) {
  return (
    <div className="pointer-events-none h-full w-full">
      <svg
        id="add-svg"
        role="img"
        aria-label="Add Section"
        height="100%"
        width="100%"
        viewBox="0 0 32 32"
        className={classes}
      >
        <path d="M 4,8 H 28" />
        <path d="M 20,8 C 20,8 21,4 16,4 11,4 12,8 12,8" />
        <path d="m 8,11 v 13 c 0,4 0,4 8,4 8,0 8,0 8,-4 V 11" />
        <path d="M 19,12 V 24" />
        <path d="M 13,12 V 24" />
      </svg>
    </div>
  );
}
