import { useAtom } from "jotai";
import { toggleVisualText, toggleInstaStyle } from "../App"
import { ImgPieceProp, ArtistsObj } from "../types/ComponentsTypes";

export default function ImgPiece({img, artists, title, idx} : ImgPieceProp) {

    const [isVisualToggleTrue] = useAtom(toggleVisualText);
    const [isInstaToggleTrue] = useAtom(toggleInstaStyle);
    const isFirstItemOnInsta:boolean = isInstaToggleTrue && idx === 0

    function formatArrayToString(arr:ArtistsObj[]) {
        return arr.map((item, index, arr) => {
            return index === arr.length - 1 ? item.name : item.name + ", "
        }).join("")
    }

    function convertInstaStyle(idx:number) {
      if(idx === 0) {
        return "col-start-1 col-end-3 row-start-1 row-end-3"
      }
      if(idx === 1) {
        return "col-start-3 col-end-4 row-start-1 row-end-2"
      }
      if(idx === 2) {
        return "col-start-3 col-end-4 row-start-2 row-end-3"
      }
      return null
    }

    return (
    <div
      className={`${isInstaToggleTrue && convertInstaStyle(idx)} relative`}
      onClick={(e) => console.log(e.target)}
    >
      {isVisualToggleTrue && (
        <div className="flex justify-center items-center flex-col bg-black/30 w-full h-full absolute px-4">
          <h2 className={`${isFirstItemOnInsta ? "text-5xl" : "text-3xl"} text-white w-4/5 text-center truncate`}>{title}</h2>
          <h3 className={`${isFirstItemOnInsta ? "mt-8 text-4xl" : "mt-4 text-2xl"} w-full text-center truncate text-gray-300`}>
            {formatArrayToString(artists)}
          </h3>
        </div>
      )}
      <img className="w-full h-full" alt="loading" src={img}></img>
    </div>
  )}