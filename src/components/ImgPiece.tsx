import { useAtom } from "jotai";
import { toggleVisualText } from "../App"
import { Draggable } from "react-beautiful-dnd";

interface ImgPieceProp {
    img:string;
    artists:artistsObj[];
    title:string;
    index:number;
    draggableId:string;
}

interface artistsObj {
    external_urls:object;
    href:string;
    id:string;
    name:string;
    type:string;
    uri:string;
}

export default function ImgPiece({img, artists, title, index, draggableId} : ImgPieceProp) {

    const [isToggleTrue] = useAtom(toggleVisualText);

    return (
<Draggable draggableId={draggableId} index={index} key={draggableId}>
  {(provided) => (
    <div
      className="relative"
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      {...provided.draggableProps}
    >
      {isToggleTrue && (
        <div className="flex justify-center items-center flex-col bg-black/30 w-full h-full absolute">
          <h2 className="text-3xl text-white w-4/5 text-center truncate">{title}</h2>
          <h3 className="mt-4">
            {artists.map((item, index, arr) => (
              <span className="w-full text-2xl text-center text-gray-300 truncate" key={index}>
                {index === arr.length - 1 ? item.name : item.name + ", "}
              </span>
            ))}
          </h3>
        </div>
      )}
      <img className="w-full h-full" alt="loading" src={img}></img>
    </div>
  )}
</Draggable>

    )
}