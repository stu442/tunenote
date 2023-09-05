import { useAtom } from "jotai";
import { toggleVisualText } from "../App"

interface ImgPieceProp {
    img:string;
    artists:artistsObj[];
    title:string;
    isFirst:boolean;
}

interface artistsObj {
    external_urls:object;
    href:string;
    id:string;
    name:string;
    type:string;
    uri:string;
}

export default function ImgPiece({img, artists, title, isFirst} : ImgPieceProp) {

    const [isToggleTrue] = useAtom(toggleVisualText);

    function formatArrayToString(arr:artistsObj[]) {
        return arr.map((item, index, arr) => {
            return index === arr.length - 1 ? item.name : item.name + ", "
        }).join("")
    }

    return (
    <div
      className={`${isFirst ? "col-span-2": null} relative`}
    >
      {isToggleTrue && (
        <div className="flex justify-center items-center flex-col bg-black/30 w-full h-full absolute px-4">
          <h2 className="text-3xl text-white w-4/5 text-center truncate">{title}</h2>
          <h3 className="mt-4 text-2xl w-full text-center truncate text-gray-300" >
            {formatArrayToString(artists)}
          </h3>
        </div>
      )}
      <img className="w-full h-full" alt="loading" src={img}></img>
    </div>
  )}