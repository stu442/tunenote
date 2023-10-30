import { AlertProps } from "../types/ComponentsTypes"

function Alert({isShowAlert = false, text}:AlertProps) {

    return (
        <div className={`${isShowAlert ? "alert_show" : "alert_hide"} alert fixed left-1/2 top-3/4 -translate-x-1/2`}>
            <span className="bg-gray-700 rounded-xl p-3 text-white text-3xl">{text}</span>
        </div>
    )
}

export default Alert