interface SearchResultProp {
    img:string;
    artists:artistsObj[];
    title:string;
    next?:string | null;
}

interface artistsObj {
    external_urls:object;
    href:string;
    id:string;
    name:string;
    type:string;
    uri:string;
}

function SearchResult({img, artists, title}:SearchResultProp) {

    return(
        <div className="flex flex-col items-center">
            <img className="rounded-lg" src={img} alt="loading"></img>
            <h2 className="w-full text-center text-2xl truncate mt-2">{title}</h2>
            {/* 아티스트 이름을 쉼표로 분리하여 표기 (그리고 마지막 부분엔 쉼표를 넣지 않음) */}
            <h3>{artists.map((item, index, arr) => (<span className="w-full text-center text-gray-500 truncate" key={index}>{index === arr.length - 1 ? item.name : item.name + ", "}</span>))}</h3>
        </div>
    )
}

export default SearchResult