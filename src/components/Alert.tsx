import { AlertProps } from "../types/ComponentsTypes"

function Alert({isShowAlert = false, text}:AlertProps) {
    return (
        <div className={`opacity-${isShowAlert ? 100 : 0} transition-opacity duration-300 ease-in-out fixed left-1/2 top-3/4 transform -translate-x-1/2`}>
            <span className="bg-gray-700 rounded-xl p-3 text-white text-3xl">{text}</span>
        </div>
    )
}

export default Alert