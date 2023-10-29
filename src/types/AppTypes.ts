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