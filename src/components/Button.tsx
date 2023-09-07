interface ButtonProps {
    innerText: string;
    onClick?(): void;
}

function Button( {innerText, onClick} : ButtonProps) {
    const btnStyle = "flex-1 text-center py-6 text-4xl font-bold text-black cursor-pointer";
    return (
    <>
    <div className={`${btnStyle} no_drag`} onClick={onClick}>{innerText}</div>
    </>
    )
}

export default Button