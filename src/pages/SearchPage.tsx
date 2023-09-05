import { useState } from "react";
import { useAtom } from "jotai";
import axios from "axios";
import SearchResult from "../components/SearchResult";
import { albumList } from '../App';

interface SearchPageProp {
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

export default function SearchPage({setIsModalClosed}:SearchPageProp) {

    const [searchData , setSearchData] = useState<SearchResultObject[]>([]);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [clickedData, setClickedData] = useAtom(albumList);
    
    async function reqNextPage() {
        const headers = {
                "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`
            }
            try {
                if(nextPage) {
                    const res = await axios.get(nextPage, {headers});
                    const newItems = res.data.albums.items;
                    setSearchData([...searchData, ...newItems]);
                    setNextPage(res.data.albums.next);
                }
            } catch (err) {
                console.error(err)
                alert("검색 결과를 로드하는데 문제가 발생했습니다.")
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

    function handleResultClick(img:string, artists:artistsObj[],title:string) {
        const key = `album_${clickedData.length}`
        const clickedDataObj = {img, artists, title, key};
        setClickedData([...clickedData, clickedDataObj])
        console.log(clickedData);
        setIsModalClosed(false);
    }
    
// 여러개 선택할 수 있는 기능을 만들면 좋겠다.

    return (
        <>
            <h1 className="flex_center text-5xl mt-8">검색</h1>
                <form className="flex_center" onSubmit={searchSubmit}>
                    <input className="my-10 w-4/5 h-20 rounded-full border-2 text-4xl px-6 border-slate-900 focus:border-blue-400" required type="text" placeholder="검색어를 입력해주세요" value={searchText} onChange={handleInputChange} />
                </form>
                <div className="grid grid-cols-2 gap-4 px-4">
                    {searchData.length > 0 ? searchData.map((ele, idx) => (<SearchResult onClick={handleResultClick} key={idx} img={ele.images[0]?.url} artists={ele?.artists} title={ele?.name} />)) : <p className="flex justify-center text-2xl">검색 결과가 없습니다!</p>}
                </div>
                <div className="flex_center">
                    {searchData.length > 0 && nextPage ? <span onClick={reqNextPage} className="cursor-pointer text-2xl text-blue-600 active:text-blue-800 ">더보기</span> : null}
                </div>
        </>
    )}