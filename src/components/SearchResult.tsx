import { ArtistsObj } from "../App";

interface SearchResultProp {
    img:string;
    artists:ArtistsObj[];
    title:string;
    next?:string | null;
    key:string;
    albumId:string;
    onClick: (img:string, artists:ArtistsObj[],title:string,albumId:string) => void;
    isClicked:boolean;
}

function SearchResult({img, artists, title, onClick, albumId, isClicked}:SearchResultProp) {

    function handleClick() {
        onClick(img, artists, title, albumId);
    }

    return(
        <>
            <div onMouseDown={handleClick} className="flex flex-col items-center">
                <div className="relative">
                    {/* 선택되었다 알려주는 곳 */}
                    {isClicked ? <div className="absolute bg-slate-900/40 w-full h-full"></div> : null}
                    {/* 체크 표시 넣을 곳 */}
                    {isClicked ? <img className="absolute right-3 top-5 w-10 h-10" src="images/check.png" alt="check" /> : null}
                    <img className="rounded-lg" src={img} alt="loading"></img>
                </div>
                <h2 className="w-full text-center text-2xl truncate mt-2">{title}</h2>
                {/* 아티스트 이름을 쉼표로 분리하여 표기 (그리고 마지막 부분엔 쉼표를 넣지 않음) */}
                <h3>{artists.map((item, index, arr) => (<span className="w-full text-center text-gray-500 truncate" key={index}>{index === arr.length - 1 ? item.name : item.name + ", "}</span>))}</h3>
            </div>
        </>
    )
}

export default SearchResult