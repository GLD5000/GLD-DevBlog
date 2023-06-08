export default function DownArrowSvg({ classes = 'stroke-none fill-current ' }) {
  return (
    <div className="pointer-events-none h-full w-full rounded-full p-1">
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
        viewBox="0 0 48 28"
      >
        <path
          d="M 2,3 C 1,4 2.2191528,5.218986 3,6 l 15.585937,15.414062 4,4 c 0.78106,0.780737 2.047065,0.780737 2.828125,0 l 4,-4 L 45,6 C 45.780847,5.218986 46.707107,3.7071068 46,3 45,2 40.781014,3.2191528 40,4 L 26.585937,18.585937 C 26.585937,18.585937 24.982437,20 24,20 23.017563,20 21.414062,18.585937 21.414062,18.585937 L 8,4 C 5.7753777,2.5631263 3,2 2,3 Z"
          className={classes}
        />
        <path className="fill-none stroke-current  stroke-4" d="m 44,12.000083 -16,16 -4,4 -4,-4 -16,-16" />
      </svg>
    </div>
  );
}
