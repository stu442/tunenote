import Checkbox from "../components/Checkbox";
import { toggleInstaStyle, toggleVisualText } from "../App";
import { useAtom } from 'jotai'

export default function SettingPage() {
    
    const [isAlbumInfo, setIsAlbumInfo] = useAtom(toggleVisualText);
    const [isInstaStyle, setIsInstaStyle] = useAtom(toggleInstaStyle);

    return (
        <div className="flex_center flex-col">
            <h1 className="text-5xl mt-8">설정</h1>
            <div className="w-4/5 mt-12">
                <h2 className="text-3xl">스타일</h2>
                <Checkbox checked={isAlbumInfo} onChange={setIsAlbumInfo}>
                    앨범정보 표시
                </Checkbox>
                <Checkbox checked={isInstaStyle} onChange={setIsInstaStyle}>
                    인스타그램 스타일
                </Checkbox>
            </div>
        </div>
    )
}