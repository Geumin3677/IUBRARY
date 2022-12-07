import Nav from "./Nav";
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AlbumData from '../Albums.json'
import './SongDetail.css';
import NotFound from "./NotFound";
import SongPlayer from "./SongPlayer";

const SongDetail = () => {
    const SongName = useParams().SongName
    const AlbumName = useParams().AlbumName
    const ABData = AlbumData.Albums.find(name => name.name === AlbumName)
    const SongData = ABData?.track.find(name => name.title === SongName)

    const Lyric = ABData.Detail.lyrics[ABData.track.findIndex(name => name.title === SongName)]
    const vid = ABData.Detail.musicVids[ABData.track.findIndex(name => name.title === SongName)]

    if(ABData === undefined || SongData === undefined)
    { 
        return(
            <NotFound />
        )
    } 

    return (
        <div className="App">
            <Nav/>
            <div className="parent">
                <div className="SPBg" style={{backgroundColor: ABData.color}}>
                    <div className="SPCxt">
                        <div className="SPInfoCxt">
                            <img className="SPImg" src={`/${ABData.imgUrl}`} />
                            <SongPlayer vid={vid}/>
                            <div className="SPTitle">{SongData.title}</div>
                            <div className="SPAbname">{AlbumName}</div>
                        </div>
                        <div className="SPLyricCxt">
                            <div className="SPL">가사</div>
                            <pre className="SPLyric">{Lyric}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongDetail