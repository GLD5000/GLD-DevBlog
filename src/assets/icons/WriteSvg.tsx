export default function WriteSvg({
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
        <path        d="M 20,4 H 7 C 5.3406393,4.3339094 4.3328067,5.3259969 4,7 v 18 c 0.3614434,1.956612 1.5809233,2.627813 3,3 h 18 c 1.863119,-0.342514 2.643714,-1.509647 3,-3 V 12"
 />
        <path        d="m 26,2 4,4 -15,14 -5,2 2,-6 z"
 />
      </svg>
    </div>
  );
}
