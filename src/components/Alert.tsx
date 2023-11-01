// import { AlertProps } from "../types/ComponentsTypes"
import { atom, useAtom } from "jotai"

export const alertAtom = atom({isVisible : false, text : ""})

function Alert() {

    const [alertState, SetAlertState] = useAtom(alertAtom)
    let timerId

    if(alertState.isVisible) {
        if(timerId) {
            clearTimeout(timerId)
        }
        timerId = setTimeout(() => {
            const newState = {...alertState};
            newState.isVisible = false;
            SetAlertState(newState);
        }, 2000)
    }

    return (
        <div className={`${alertState.isVisible ? "alert_show" : "alert_hide"} alert fixed left-1/2 top-3/4 -translate-x-1/2`}>
            <span className="bg-gray-700 rounded-xl p-5 text-white text-3xl">{alertState.text}</span>
        </div>
    )
}

export default Alert