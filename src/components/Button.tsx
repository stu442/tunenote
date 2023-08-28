interface ButtonProps {
    innerText: string;
    onClick?(): void;
}

function Button( {innerText, onClick} : ButtonProps) {
    return (
    <>
    <div className="btn_style no_drag" onClick={onClick}>{innerText}</div>
    </>
    )
}

export default Button