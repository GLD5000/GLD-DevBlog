export default function HorizontalDivider({ classes = 'stroke-current fill-none stroke-1' }) {
  return (
    <div className="pointer-events-none  h-full w-fit ">
      <svg
        id="add-svg"
        role="presentation"
        aria-label="Add Section"
        className="pointer-events-none  h-full w-2 "
        viewBox="0 0 2 40"
      >
        <path
          d="M 1,0
      L 1,40 
     "
          className={classes}
        />
      </svg>
    </div>
  );
}
