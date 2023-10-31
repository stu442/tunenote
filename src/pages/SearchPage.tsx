import { useState } from "react";
import { atom, useAtom } from "jotai";
import axios from "axios";
import SearchResult from "../components/SearchResult";
import { albumList } from '../App';
import { ClickedDataObj, ArtistsObj, SearchPageProp, SearchResultObject } from "../types/PageTypes";
import Alert from "../components/Alert";
import { alertAtom } from "../components/Alert";

export const clickData = atom<ClickedDataObj[]>([]);

export default function SearchPage({setIsModalClosed}:SearchPageProp) {

    const [searchData , setSearchData] = useState<SearchResultObject[]>([]);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [albumData, setAlbumData] = useAtom(albumList);
    const [clickedData, setClickedData] = useAtom(clickData);
    const [, setAlertVisible] = useAtom(alertAtom);

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

    function handleResultClick(img:string, artists:ArtistsObj[],title:string, albumId:string) {
        const clickedDataObj = { img, artists, title, albumId };
        const isDuplicated = clickedData.some((ele) => ele.albumId === albumId);
        const isAlbumFull = albumData.length >= 9 || albumData.length + clickedData.length >= 9;
      
        if (isDuplicated) {
          setClickedData(clickedData.filter((ele) => ele.albumId !== albumId));
        } else if (!isAlbumFull) {
          setClickedData([...clickedData, clickedDataObj]);
        } else {
            setAlertVisible(true);
        }
    }
    
    function handleSubmitBtn() {
        setAlbumData([...albumData, ...clickedData]);
        setClickedData([]);
        setIsModalClosed(false);
    }

    return (
        <>
            <div className="sticky top-0 grid grid-cols-3 z-10">
                <div></div>
                <h1 className="text-center text-5xl mt-8">검색</h1>
                <button onClick={handleSubmitBtn} className="text-center text-3xl mt-8">제출 {clickedData.length > 0 ? `(${clickedData.length})` : ""}</button>
            </div>
                <form className="flex_center" onSubmit={searchSubmit}>
                    <input className="my-10 w-4/5 h-20 rounded-full border-2 text-4xl px-6 border-slate-900 focus:border-blue-400" required type="text" placeholder="검색어를 입력해주세요" value={searchText} onChange={handleInputChange} />
                </form>
                <div className="grid grid-cols-2 gap-4 px-4">
                    {searchData.length > 0 ? (
                    searchData.map((ele, idx) => (
                        <SearchResult
                        onClick={handleResultClick}
                        key={`SearchResult${idx}`}
                        img={ele.images[0]?.url}
                        artists={ele?.artists}
                        title={ele?.name}
                        albumId={ele?.id}
                        isClicked={clickedData.some((element) => element.albumId === ele.id)}
                        />
                        ))
                        ) : (
                            <p className="flex justify-center text-2xl h-[70vh]">
                        검색 결과가 없습니다!
                    </p>
                    )}
                    <Alert text="최대 9개 까지 선택 가능합니다!!" />
                    </div>
                <div className="flex_center">
                    {searchData.length > 0 && nextPage ? <span onClick={reqNextPage} className="cursor-pointer text-2xl text-blue-600 active:text-blue-800 ">더보기</span> : null}
                </div>
                
        </>
    )}