import React, { useMemo } from 'react';
import Nav from './Nav';
import AlbumData from '../Albums.json'

class AlbumPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {filter: ""}
    }

    AlbumsSetup() {

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
                    target.classList.add("grid-item--show");
                    return;
                }

                target.classList.remove("grid-item--show");
            });
        })

        var res = []
        for(var a of AlbumData.Albums)
        {
            var textcolor = a.color
            if(a.black)
            {
                textcolor = 'rgb(36, 36, 36)'
            }
            var ft = false
            if(a.name.toUpperCase().includes(this.state.filter.toUpperCase()))
            {
                ft = true
            }
            for(var s of a.track)
            {
                if(s.title.toUpperCase().includes(this.state.filter.toUpperCase()))
                {
                    ft = true
                }
            }
            if(ft)
            {
                res.push(
                    <button ref={observe} id={`${a.name}`} onClick={this.LinkToAlbum.bind(this, a)} className='APAlBg' style={{color: textcolor}}>
                        <img className='APAlImg' src={a.imgUrl} />
                        <div className='APAlTxs'>
                            <div className='APAlT'>{a.name}</div>
                            <div className='APAlsT'>{a.subtitle}</div>
                        </div>
                    </button>
                )
            }
        }
        if(!res.length)
        {
            res.push(<div className='APNoSearchRes'>일치하는 검색 결과가 없습니다.</div>)
        }
        return res
    }

    LinkToAlbum(a, b)
    {
        window.location.href = `/Album/${a.name}`
    }

    OptionsSetup() {
        var res  = []
        for(var a of AlbumData.Albums)
        {
            res.push(
                <option value={a.name} />
            )
        }
        return res
    }

    handleChange(event) {
        this.setState({filter: event.target.value})
    }

    render() {
        return <>
            <div className='App'>
                <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
                <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
                <div className='parent AP'>
                    <Nav />
                    <div className='APTop show'>
                        <div className='APAlbum'>Albums</div>
                        <div className='APLine'></div>
                        <div className='SearchBg'>
                            <input list='SearchOptions' autoComplete='on' onChange={this.handleChange.bind(this)} type='text' className='APSearchBar'></input>
                            <datalist id='SearchOptions'>
                                {
                                    this.OptionsSetup()
                                }
                            </datalist>
                            <ion-icon class='SearchIcon' name="search-outline"></ion-icon>
                        </div>
                    </div>
                    <div className='APAlbumCxt show'>
                            {
                                this.AlbumsSetup()
                            }   
                    </div> 
                    <div className="bottom">
                        © 2022 IUBRARY. All Rights Reserved.<br></br>Made by ABELA With dlwlrma💜
                    </div>
                </div>
            </div>
        </>
    }
}

export default AlbumPage