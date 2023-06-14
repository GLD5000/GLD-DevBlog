import { MouseEvent, ReactElement } from "react";
import SvgButtonNew from "./SvgButtonNew";
import DeleteSvg from "@/assets/icons/DeleteSvg";

export default function SpicyLi({
  content,
  className = "m-2",
  id,
  closeFunction,
}: {
  className: string;
  content:string;
  id: string;
  closeFunction: (tagValue:string) => void;
}) {
  return (
    <li id={id} className={className} >
      <span
        id={`${id}-tag-btn`}
        className="m-0 h-full block w-full rounded-r-none p-1  "
      >
        {content.length > 15? `${content.slice(0,12)}...`: content}
      </span>

      <SvgButtonNew
        clickFunction={(e)=> {closeFunction(content)}}
        id={`${id}-close-btn`}
        name={`${id}-close-btn`}
        showTextIn={false}
        className="  h-full rounded-full rounded-l-none m-0 p-0 hover:transition aspect-square hover:bg-[#767676] hover:text-white focus:bg-[#767676] focus:text-white text-current items-center"
        reverse={false}
        textElement={null}
        svg={<div className="pointer-events-none h-6 w-6 p-0"><DeleteSvg/></div>}
      />
    </li>
  );
}
