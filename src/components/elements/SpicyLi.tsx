"use client";

import CloseSvg from "@/assets/icons/CloseSvg";
import {
  closeTag as closeFunction,
  recolourTag as colourUpdateFunction,
  useDispatch,
} from "@/lib/redux";
import getRandomColour from "@/utilities/colour/randomColour";
import SvgButtonNew from "./SvgButtonNew";

export default function SpicyLi({
  content,
  className = "m-2",
  id,
  inputcolour,
}: {
  className: string;
  content: string;
  id: string;
  inputcolour: string;
}) {
  // const [colour, setColour] = useState(inputcolour || getRandomColour("mid"));
  const dispatch = useDispatch();
  return (
    <li id={id} className={className} style={{ backgroundColor: inputcolour }}>
      <button
        type="button"
        id={`${id}-tag-btn`}
        className="m-0 block h-full w-full rounded-r-none p-1 text-current"
        onClick={(e) => {
          e.preventDefault();
          dispatch(
            colourUpdateFunction({
              name: content,
              colour: getRandomColour("mid"),
            })
          );
        }}
      >
        {content.length > 15 ? `${content.slice(0, 12)}...` : content}
      </button>

      <SvgButtonNew
        clickFunction={(e) => {
          e.preventDefault();
          dispatch(closeFunction(content));
        }}
        id={`${id}-close-btn`}
        name={`${id}-close-btn`}
        showTextIn={false}
        className="  m-0 aspect-square h-full items-center rounded-full rounded-l-none p-0 text-current hover:bg-[#767676] hover:text-txt-main-dk hover:transition focus:bg-[#767676] focus:text-txt-main-dk"
        reverse={false}
        textElement={null}
        svg={
          <div className="pointer-events-none h-6 w-6 p-0">
            <CloseSvg />
          </div>
        }
      />
    </li>
  );
}
