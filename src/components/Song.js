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

    const observe = (element) => {
        if (!element) {
            return;
        }

        observer.observe(element);
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const { target, isIntersecting } = entry;

            if (isIntersecting) {
                target.classList.add("item--show");
                return;
            }
        });
    })

    function LinkToAlbum(a, b, c)
    {
        //a => 현재 앨범 데이터 / b => 이전 = -1 다음 = +1
        var song = ABData.track[ABData.track.findIndex(name => name.title === SongData.title) + b].title
        window.location.href = `/Album/${ABData.name}/${song}`
    }

    return (
        <div className="App">
            <Nav/>
            <div className="parent">
                <div className="SPBg" style={{backgroundColor: ABData.color}}>
                    <div className="SPCxt">
                        <div className="SPInfoCxt">
                            <img ref={observe} className="SPImg" src={`/${ABData.imgUrl}`} />
                            <div ref={observe} className="MusicCtr">
                                <div className="SPTitle">{SongData.title}</div>
                                <Link to={`/Album/${AlbumName}`}>
                                    <div className="SPAbname">{AlbumName}</div>
                                </Link>
                                <SongPlayer vid={vid} ABData={ABData}/>
                            </div>
                        </div>
                        <div className="SPLyricCxt">
                            <div ref={observe} className="SPL">가사</div>
                            <div ref={observe} className="grad">
                                <pre className="SPLyric" style={{background: `1linear-gradient(to Top, ${ABData.color} 0%, ${ABData.color} 10%, #ffffff00 10%, #ffffff00 100%)` }}>{Lyric}</pre>
                            </div>
                        </div>
                        <div ref={observe} className="ALButtons SongBtnMargin">
                        <button className="ALButton" onClick={() => {window.location.href= `/Album/${ABData.name}`}}><ion-icon class='ALicon' name="arrow-forward-outline"></ion-icon></button>
                            {
                                (ABData.track.findIndex(name => name.title === SongData.title) !== 0) ? (
                                    <button className="ALButton" onClick={LinkToAlbum.bind(this, ABData, -1)}><ion-icon class='ALicon' name="chevron-up-outline"></ion-icon></button>
                                ) : (
                                    <></>
                                )
                            }
                            {
                                ((ABData.track.findIndex(name => name.title === SongData.title) + 1) !== ABData.track.length) ? (
                                    <button className="ALButton" onClick={LinkToAlbum.bind(this, ABData, 1)}><ion-icon class='ALicon' name="chevron-down-outline"></ion-icon></button>
                                ) : (
                                    <></>
                                )
                            } 
                        <div className="SongNum">{ABData.track.findIndex(name => name.title === SongData.title) + 1}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongDetail