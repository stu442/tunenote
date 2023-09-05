import { useState } from "react";
import { atom, useAtom } from "jotai"
import { atomWithStorage } from 'jotai/utils'
import * as htmlToImage from 'html-to-image';
import Button from "./components/Button";
import Modal from "./components/Modal";
import ImgPiece from "./components/ImgPiece";
import SearchPage from "./pages/SearchPage";
import SettingPage from "./pages/SettingPage";

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
export const toggleVisualText = atomWithStorage("toggleVisualText", false);
export const toggleInstaStyle = atomWithStorage("toggleInstaStyle", false);

export default function App() {

  const [isSearchModalClosed, setIsSearchModalClosed] = useState<boolean>(false);
  const [isSettingModalClosed, setIsSettingModalClosed] = useState<boolean>(false);
  const [albumArray] = useAtom(albumList)

  function clickPostBtn() {
    setIsSearchModalClosed(true);
  }

  function clickSettingBtn() {
    setIsSettingModalClosed(true);
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
    {isSearchModalClosed ? <Modal setIsModalClosed={setIsSearchModalClosed}><SearchPage setIsModalClosed={setIsSearchModalClosed}></SearchPage></Modal> : null}
    {isSettingModalClosed ? <Modal setIsModalClosed={setIsSettingModalClosed}><SettingPage></SettingPage></Modal> : null}
    <nav className="flex_center space-x-2 py-9">
      <Button innerText="Post" onClick={clickPostBtn} />
      <Button innerText="Download" onClick={captureMain}/>
      <Button innerText="Share" />
      <Button innerText="Setting" onClick={clickSettingBtn} />
    </nav>
          <main
            className="grid grid-cols-3 overflow-hidden"
          >
            {albumArray.map((ele, idx) => (
              <ImgPiece
                img={ele.img}
                artists={ele.artists}
                title={ele.title}
                isFirst={idx === 0}
              />
            ))}
          </main>
  </div>
  );
}