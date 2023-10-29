import { useAtom } from "jotai";
import { clickData } from "../pages/SearchPage";
import { ModalProp } from "../types/ComponentsTypes";

function Modal({setIsModalClosed, children} : ModalProp) {
    const [, setClickedData] = useAtom(clickData);

    function handleOutsideClick(e: React.TouchEvent<HTMLDivElement>) {
        // localstorage access 토큰을 지울지 말지 생각해보기

        if(e.target === e.currentTarget) {
            setIsModalClosed(false)
            setClickedData([])
        }
    }

    return (
        <div onTouchEnd={e => handleOutsideClick(e)} className="flex_center absolute bg-gray-400/30 z-10 dvh w-screen ">
            <div className="w-[70vw] max-h-[70vh] bg-white overflow-y-auto overflow-x-hidden pt-4 pb-16 rounded-3xl">
                {children}
            </div>
        </div>
    )
}

export default Modal