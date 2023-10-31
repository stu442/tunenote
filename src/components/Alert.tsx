import { AlertProps } from "../types/ComponentsTypes"
import { atom, useAtom } from "jotai"

export const alertAtom = atom(false)

function Alert({text}:AlertProps) {

    const [isVisible, setIsVisible] = useAtom(alertAtom)

    if(isVisible) {
        setTimeout(() => {
            setIsVisible(false)
        }, 2000)
    }

    return (
        <div className={`${isVisible ? "alert_show" : "alert_hide"} alert fixed left-1/2 top-3/4 -translate-x-1/2`}>
            <span className="bg-gray-700 rounded-xl p-5 text-white text-3xl">{text}</span>
        </div>
    )
}

export default Alert