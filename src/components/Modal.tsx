import { useState, useRef, useEffect } from "react";
import axios from "axios";
import SearchResult from "./SearchResult";

interface ModalProp {
    setIsModalClosed: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SearchResultObject {
    album_type:string;
    artists:artistsObj[];
    available_markets:object;
    external_urls:object;
    href:string;
    id:string;
    images:imagesObj[];
    name:string;
    release_date:string;
    release_date_precision:string;
    total_tracks:number;
    type:string;
    uri:string;
}

interface imagesObj {
    height:number;
    width:number;
    url:string;
}

interface artistsObj {
    external_urls:object;
    href:string;
    id:string;
    name:string;
    type:string;
    uri:string;
}

function Modal({setIsModalClosed} : ModalProp) {
    const [searchText, setSearchText] = useState<string>("")
    const [searchData , setSearchData] = useState<SearchResultObject[]>([])
    const [nextPage, setNextPage] = useState<string | null>(null)

    const target = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (target.current) {
            console.log("관찰중");
            observer.observe(target.current);
          }
    }, [nextPage])

    const options = {
        threshold: 1.0,
      };
    
      async function callback() {
        const headers = {
            "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`
        }
        try {
            if(nextPage) {
                const res = await axios.get(nextPage, {headers});
                const newItems = res.data.albums.items;
                console.log(searchData)
                setSearchData([...searchData, ...newItems]);
                setNextPage(res.data.albums.next);
                console.log(searchData)
            }

        } catch (err) {
            console.error(err)
            alert("검색 결과를 로드하는데 문제가 발생했습니다.")
        }
      }
    
    const observer = new IntersectionObserver(callback, options);

    function handleOutsideClick(e: React.MouseEvent<HTMLDivElement>) {
        // localstorage access 토큰을 지울지 말지 생각해보기

        if(e.target === e.currentTarget) {
            setIsModalClosed(false)
        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(e.target.value)
    }

    async function reqAccessToken() {
        const apiUrl = "https://accounts.spotify.com/api/token"
        const headers = {
            "Content-Type":"application/x-www-form-urlencoded",
        }
        const CLIENT_ID = process.env.REACT_APP_CLIENT_ID as string;
        const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET as string;
        const data = {
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        };
        try {
            const res = await axios.post(apiUrl, data, {headers});
            localStorage.setItem('accessToken', res.data.access_token);
        } catch(err) {
            console.error(err)
            alert("에러 발생, ACCESS 토큰 발급에 실패했습니다.");

        }
    }

    async function reqSearchResult(keyword?:string) {
        // limit 과 offset 을 활용해서 다양한 것이 가능함
        const headers = {
            "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`
        }
        try {
            const res = await axios.get(`https://api.spotify.com/v1/search?q=${keyword}&type=album&offset=0`, {headers});
            setSearchData(res.data.albums.items);
            setNextPage(res.data.albums.next);
        } catch (err) {
            console.error(err)
            alert("검색 결과를 로드하는데 문제가 발생했습니다.")
             setIsModalClosed(true)
        }
    }

    async function searchSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await reqAccessToken();
        await reqSearchResult(searchText);
        setSearchText("");
    }

    

    return (
        <div onClick={e => handleOutsideClick(e)} className="flex_center absolute bg-gray-400/30 dvh w-screen ">
            <div className=" h-[70vh] w-[70vw] bg-white overflow-y-auto overflow-x-hidden py-4">
                <form className="flex_center" onSubmit={searchSubmit}>
                    <input className="my-10 w-4/5 h-20 rounded-full border-2 text-4xl px-6 border-slate-900 focus:border-blue-400" required type="text" placeholder="검색어를 입력해주세요" value={searchText} onChange={handleInputChange} />
                </form>
                <div className="grid grid-cols-2 gap-4 px-4">
                    {/* {searchData.map((ele) => <SearchResult img={ele.images[0]?.url} artists={ele.artists} title={ele.name} />)} */}
                    {/* 무한 스크롤 오류 잡기 (계속 리랜더링 돼...) */}
                    {searchData.length > 0 ? searchData.map((ele, idx) => (<SearchResult key={idx} img={ele.images[0]?.url} artists={ele.artists} title={ele.name} />)) : <p className="flex justify-center text-2xl">검색 결과가 없습니다.</p>}
                </div>
                    {searchData.length > 0 ? <div ref={target} className="w-full h-1"></div> : null}
            </div>
        </div>
    )
}

export default Modal