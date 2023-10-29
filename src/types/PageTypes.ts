
export interface ArtistsObj {
    external_urls:object;
    href:string;
    id:string;
    name:string;
    type:string;
    uri:string;
  }
  
  export interface ClickedDataObj {
    img:string;
    artists:ArtistsObj[];
    title:string;
    albumId:string;
  }

  export interface SearchPageProp {
    setIsModalClosed: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SearchResultObject {
    album_type:string;
    artists:ArtistsObj[];
    available_markets:object;
    external_urls:object;
    href:string;
    id:string;
    images:ImagesObj[];
    name:string;
    release_date:string;
    release_date_precision:string;
    total_tracks:number;
    type:string;
    uri:string;
}

export interface ImagesObj {
    height:number;
    width:number;
    url:string;
}