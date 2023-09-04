import { useState } from "react";
import { atom, useAtom } from "jotai"
import * as htmlToImage from 'html-to-image';
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
  const [albumArray] = useAtom(albumList)

  function clickPostBtn() {
    setIsModalClosed(true);
  }

  function captureMain() {
    let main = document.querySelector("main") as HTMLDivElement;
    htmlToImage.toPng(main)
  .then(function (dataUrl) {
    saveImg(dataUrl, "main.png");
  })
  }

  const saveImg = (uri:string, filename:string) => {
    let link = document.createElement('a');
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App relative flex flex-col">
    {isModalClosed ? <Modal setIsModalClosed={setIsModalClosed} /> : null}
    <nav className="flex_center space-x-2 py-9">
      <Button innerText="Post" onClick={clickPostBtn} />
      <Button innerText="Download" onClick={captureMain}/>
      <Button innerText="Share" />
      <Button innerText="Setting" />
    </nav>
          <main
            className="grid grid-cols-3 overflow-hidden"
          >
            {albumArray.map((ele, idx) => (
              <ImgPiece
                key={ele.key}
                img={ele.img}
                artists={ele.artists}
                title={ele.title}
                draggableId={ele.key}
                
              />
            ))}
          </main>
  </div>
  );
}

