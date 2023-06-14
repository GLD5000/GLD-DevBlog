export default function SaveSvg({
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
        <path          d="m 5,16 v 8 c 0.3626942,1.961663 1.5845651,2.626871 3,3 h 16 c 1.517375,-0.351391 2.662126,-1.169923 3,-3 v -8"
 />
        <path d="M 16,4 V 20" />
        <path  d="m 10,16 6,4 6,-4" />
      </svg>
    </div>
  );
}
