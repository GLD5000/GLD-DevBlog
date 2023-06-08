export default function EllipsisSvg({
  wrapperClasses = ' pointer-events-none h-full w-full block fill-current my-auto',
  classes = ' fill-current stroke-none ',
}) {
  return (
    <div className={wrapperClasses}>
      <svg id="untick-svg" role="img" aria-label="Toggle Off" height="100%" width="100%" viewBox="0 0 32 8">
        <circle className={classes} cy="4" cx="6" r="3" />
        <circle className={classes} cy="4" cx="16" r="3" />
        <circle className={classes} cy="4" cx="26" r="3" />
      </svg>
    </div>
  );
}
