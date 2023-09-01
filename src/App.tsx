import { useState } from "react";
import { atom, useAtom } from "jotai"
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Button from "./components/Button";
import Modal from "./components/Modal";
import ImgPiece from "./components/ImgPiece";

interface artistsObj {
  external_urls:object;
  href:string;
  id:string;
  name:string;
  type:string;
  uri:string;
}

interface clickedDataObj {
  img:string;
  artists:artistsObj[];
  title:string;
  key:string;
}

export const albumList = atom<clickedDataObj[]>([]);
// 원래는 false 를 기본값으로
// toggle 을 어디에 만들지 생각해보기
export const toggleVisualText = atom<boolean>(true);

export default function App() {

  const [isModalClosed, setIsModalClosed] = useState<boolean>(false);
  const [albumArray, setAlbumArray] = useAtom(albumList)

  function clickPostBtn() {
    setIsModalClosed(true);
    console.log(albumArray);
  }

  function onDragEnd(result:DropResult) {
    const {source, destination} = result;
    if(!destination) return;
    if(source.droppableId === destination.droppableId && source.index === destination.index) return;

    // albumArray 를 새 배열로 복사해둠
    const recordedAlbumArray = Array.from(albumArray);
    // 옮겨질 요소를 꺼냄
    const [movedItem] = recordedAlbumArray.splice(source.index, 1);
    // 요소를 복사한 배열에 올바른 위치에 붙여 놓음
    recordedAlbumArray.splice(destination.index, 0, movedItem);

    // state에 적용한다.
    setAlbumArray(recordedAlbumArray);
  }

  return (
    <div className="App relative">
    {isModalClosed ? <Modal setIsModalClosed={setIsModalClosed} /> : null}
    <nav className="flex_center space-x-10 py-9">
      <Button innerText="Post" onClick={clickPostBtn} />
      <Button innerText="Download" />
      <Button innerText="Share" />
    </nav>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable direction="horizontal" droppableId="Album_list">
        {(provided) => (
          <main
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="grid grid-cols-3 overflow-hidden"
          >
            {albumArray.map((ele, index) => (
              <ImgPiece
                key={ele.key}
                img={ele.img}
                artists={ele.artists}
                title={ele.title}
                index={index}
                draggableId={ele.key}
              />
            ))}
            {provided.placeholder}
          </main>
        )}
      </Droppable>
    </DragDropContext>
  </div>
  
  );
}

