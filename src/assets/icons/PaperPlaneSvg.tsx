export default function PaperPlaneSvg({ classes = 'stroke-none fill-current ' }) {
  return (
    <div className="pointer-events-none my-auto h-8 w-8 rounded-none">
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
        viewBox="0 0 16 16"
      >
        <path d="M 15,1 5.0019531,12.400391 8,15 Z m 0,0 -14,8 2.9394531,2.488281 z" className={classes} />
      </svg>
    </div>
  );
}
