import Nav from "./Nav";
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AlbumData from '../Albums.json'
import './AlbumDetail.css';
import NotFound from "./NotFound";

const AlbumDetail = () => {
    const AlbumName = useParams().AlbumName
    const ABData = AlbumData.Albums.find(name => name.name === AlbumName)

    if(ABData === undefined)
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
        var al = AlbumData.Albums[AlbumData.Albums.findIndex(name => name.name === a.name) + b].name
        window.location.href = `/Album/${al}`
    }

    return (
        <div className="App">
            <Nav/>
            <div className="parent">
                <div className="ALTBg" style={{backgroundColor: ABData.color}}>
                    <div className="ALProfile show">
                        <img className="ALImg" src={`../${ABData.imgUrl}`} />
                        <div className="ALINFO">
                            <div className="ALsTitle">{ABData.subtitle}</div>
                            <div className="ALTitle">{ABData.name}</div>
                            <div className="ALDate">{ABData.Detail.date}</div>
                        </div>
                        <div className="ALButtons">
                        <button className="ALButton" onClick={() => {window.location.href= '/Albums'}}><ion-icon class='ALicon' name="arrow-forward-outline"></ion-icon></button>
                            {
                                ((AlbumData.Albums.findIndex(name => name.name === ABData.name) - 1) != -1) ? (
                                    <button className="ALButton" onClick={LinkToAlbum.bind(this, ABData, -1)}><ion-icon class='ALicon' name="chevron-up-outline"></ion-icon></button>
                                ) : (
                                    <></>
                                )
                            }
                            {
                                ((AlbumData.Albums.findIndex(name => name.name === ABData.name) + 1) != AlbumData.Albums.length) ? (
                                    <button className="ALButton" onClick={LinkToAlbum.bind(this, ABData, 1)}><ion-icon class='ALicon' name="chevron-down-outline"></ion-icon></button>
                                ) : (
                                    <></>
                                )
                            } 
                        </div>
                    </div>
                    <div className="ALCxt show" style={{color: ABData.color}}>
                        <div className="ALTG">
                            <div className="ALTit Top Intro">소개글
                                <div ref={observe} className="ALCard">
                                    <svg class="Ekdhavy" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000">
                                        <path style={{fill: ABData.color}} d="M369.5,91.2C183.9,175.2,10,375.2,10,633.4c0,159.5,101.5,275.5,226.1,275.5c130.5,0,197.2-98.6,197.2-188.5c0-104.3-72.5-185.6-179.8-185.6c-31.9,0-63.8,8.7-81.2,23.2c0-127.6,101.4-278.4,258-356.6L369.5,91.2z M926.2,91.2c-185.6,84-362.4,284.1-362.4,542.2c0,159.5,104.4,275.5,229,275.5c130.5,0,197.2-98.6,197.2-188.5c0-104.3-72.5-185.6-182.7-185.6c-31.9,0-60.9,8.7-78.3,23.2c0-127.6,101.5-278.4,258-356.6L926.2,91.2z"/>
                                    </svg>
                                    <pre className="IntroDes" style={{color: ABData.color}}>{ABData.Detail.Intro}</pre>
                                    <svg class="Ekdhavy second" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000">
                                        <path style={{fill: ABData.color}} d="M369.5,91.2C183.9,175.2,10,375.2,10,633.4c0,159.5,101.5,275.5,226.1,275.5c130.5,0,197.2-98.6,197.2-188.5c0-104.3-72.5-185.6-179.8-185.6c-31.9,0-63.8,8.7-81.2,23.2c0-127.6,101.4-278.4,258-356.6L369.5,91.2z M926.2,91.2c-185.6,84-362.4,284.1-362.4,542.2c0,159.5,104.4,275.5,229,275.5c130.5,0,197.2-98.6,197.2-188.5c0-104.3-72.5-185.6-182.7-185.6c-31.9,0-60.9,8.7-78.3,23.2c0-127.6,101.5-278.4,258-356.6L926.2,91.2z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="ALTit Top  ALSongs">수록곡
                                <div ref={observe} className="ALCard" style={{color: ABData.color}}>
                                    {
                                        ABData.track.map((song) => (
                                            <div className="songCnt">
                                                <div className="songNum">{(ABData.track.findIndex(name => name.title === song.title) + 1)}</div>
                                                <Link to={`/Album/${AlbumName}/${song.title}`}>
                                                    <div style={{color: ABData.color}} className="songTitle">{song.title}</div>
                                                </Link>
                                                <div className="songTime">{song.time}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            ABData.Detail.IsAlbum ? (
                                <div className="ALTit">수록곡 소개
                                    {
                                        ABData.track.map((song) => (
                                            <div ref={observe} className="ALCard" style={{color: ABData.color}}>
                                                <Link to={`/Album/${AlbumName}/${song.title}`}><div style={{color: ABData.color}} className="Tit">{song.title}</div></Link>
                                                <pre className="des">{song.des}</pre>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <div></div>
                            )
                        }
                        <div className="ALTit">관련 영상
                            <div className="Vids">
                                {
                                    ABData.Detail.relatedVid.map((vid) => (
                                        <div ref={observe} className="ALCard vidC" style={{color: ABData.color}}>
                                            <iframe className="Vid" src={`https://www.youtube.com/embed/${vid}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    © 2022 IUBRARY. All Rights Reserved.<br></br>Made by ABELA With dlwlrma💜
                </div>
            </div>
        </div>
    )
}

export default AlbumDetail;