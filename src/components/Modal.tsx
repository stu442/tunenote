interface ModalProp {
    setIsModalClosed: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}

function Modal({setIsModalClosed, children} : ModalProp) {

    function handleOutsideClick(e: React.MouseEvent<HTMLDivElement>) {
        // localstorage access 토큰을 지울지 말지 생각해보기

        if(e.target === e.currentTarget) {
            setIsModalClosed(false)
        }
    }

    return (
        <div onClick={e => handleOutsideClick(e)} className="flex_center absolute bg-gray-400/30 z-10 dvh w-screen ">
            <div className="h-[70vh] w-[70vw] bg-white overflow-y-auto overflow-x-hidden py-4 rounded-3xl">
                {children}
            </div>
        </div>
    )
}

export default Modal