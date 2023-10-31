import { useEffect, useState } from "react";
import { atom, useAtom } from "jotai"
import { atomWithStorage } from 'jotai/utils'
import * as htmlToImage from 'html-to-image';
import Button from "./components/Button";
import Modal from "./components/Modal";
import ImgPiece from "./components/ImgPiece";
import SearchPage from "./pages/SearchPage";
import SettingPage from "./pages/SettingPage";
import { useSearchParams } from "react-router-dom";
import { ClickedDataObj } from "./types/AppTypes";
import { alertAtom } from "./components/Alert";
import Alert from "./components/Alert";


export const albumList = atom<ClickedDataObj[]>([]);
export const toggleVisualText = atomWithStorage("toggleVisualText", false);
export const toggleInstaStyle = atomWithStorage("toggleInstaStyle", false);

export default function App() {

  const [isSearchModalClosed, setIsSearchModalClosed] = useState<boolean>(false);
  const [isSettingModalClosed, setIsSettingModalClosed] = useState<boolean>(false);
  const [initialized, setInitialized] = useState(false);
  const [albumArray] = useAtom(albumList)
  const [urlString, setUrlString] = useSearchParams();
  const [, setAlertVisible] = useAtom(alertAtom);


  useEffect(() => {
    urlString.set("albums", JSON.stringify(albumArray));
    setUrlString(urlString);
  }, [albumArray])


  function clickPostBtn() {
    setIsSearchModalClosed(true);
  }

  function clickSettingBtn() {
    setIsSettingModalClosed(true);
  }

  function captureMain() {
    if(albumArray.length === 0) return
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

  function getQueryData() {
    const queryData = urlString.get("albums");
    if(queryData) {
      const albumData = JSON.parse(queryData);
      albumArray.splice(0, albumArray.length, ...albumData);
    }
    setInitialized(true);
  }

  function handleShareBtn() {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
    setAlertVisible(true);
  }

  if (!initialized) {
    getQueryData()
  }

  return (
    <div className="App relative flex flex-col">
    {isSearchModalClosed ? <Modal setIsModalClosed={setIsSearchModalClosed}><SearchPage setIsModalClosed={setIsSearchModalClosed}></SearchPage></Modal> : null}
    {isSettingModalClosed ? <Modal setIsModalClosed={setIsSettingModalClosed}><SettingPage></SettingPage></Modal> : null}
    <nav className="flex_center py-9">
      <Button innerText="Post" onClick={clickPostBtn} />
      <Button innerText="Download" onClick={captureMain}/>
      <Button innerText="Share" onClick={handleShareBtn} />
      <Button innerText="Setting" onClick={clickSettingBtn} />
      <Alert text={"주소를 복사했습니다."} />
    </nav>
          <main
            className="grid grid-cols-3 overflow-hidden"
          >
            {albumArray.map((ele, idx) => (
              <ImgPiece
                img={ele.img}
                artists={ele.artists}
                title={ele.title}
                idx={idx}
                key={`albumList${idx}`}
              />
            ))}
          </main>
  </div>
  );
}