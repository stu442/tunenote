export interface AlertProps {
    isShowAlert?: boolean;
    text: string;
}

export interface ButtonProps {
    innerText: string;
    onClick?(): void;
}

export interface Checkboxprops {
    children:React.ReactNode;
    disabled?:boolean;
    checked:boolean;
    onChange:(checked:boolean)=>void;
    
}

export interface ModalProp {
    setIsModalClosed: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}


export interface SearchResultProp {
    img:string;
    artists:ArtistsObj[];
    title:string;
    next?:string | null;
    key:string;
    albumId:string;
    onClick: (img:string, artists:ArtistsObj[],title:string,albumId:string) => void;
    isClicked:boolean;
}

export interface ImgPieceProp {
    img:string;
    artists:ArtistsObj[];
    title:string;
    idx:number;
}

export interface ArtistsObj {
    external_urls:object;
    href:string;
    id:string;
    name:string;
    type:string;
    uri:string;
  }