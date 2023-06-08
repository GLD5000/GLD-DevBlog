export default function LeftArrowSvg({ classes = 'fill-none stroke-2 stroke-current ' }) {
  return (
    <svg
      style={{
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
      id="add-svg"
      role="img"
      aria-label="Add Section"
      height="100%"
      width="100%"
      viewBox="3 0 32 32"
    >
      <path d="m 20,8 11,8 -11,8" className={classes} />
      <path d="M 30,16 H 8" className={classes} />
    </svg>
  );
}
