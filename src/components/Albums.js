import React from 'react';
import { Link } from 'react-router-dom';
import AlbumData from '../Albums.json'

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

class Albums extends React.Component {
    constructor(props) {
        super(props)
        this.state = {Albums : [], ShowAlbum : [], Re :""}

        AlbumData.Albums.forEach(AlbumData => {
            this.state.Albums.unshift(AlbumData)
        })

        var n = 0
        while(n < 6)
        {
            const album = this.state.Albums.pop()
            this.state.ShowAlbum.unshift(album)
            n++
        }

        
    }

    async AlbumClick(a) {
        const tmpM = [40, 31, 25, 18, 10, 0]
        const tmpWH = [0, 10, 15, 20, 25, 30]
        const tmp = ['one', 'two', 'three', 'four', 'five', 'six']

        var pos = 5 - tmp.indexOf(a.target.parentNode.className.split(' ')[1])
        
        if(pos === 0) { pos = 1 }

        var e = 0
        while(e < pos)
        {

            this.state.Albums.unshift(this.state.ShowAlbum.pop())
            this.state.ShowAlbum.unshift(this.state.Albums.pop())

            const old = document.getElementById(`6`)
            if(old != null)
            {
                old.remove()
            }

            const top = document.getElementById(`5`)
            top.style = `margin-bottom: 20vw; opacity:0; visibility: hidden; z-index: 88`
            top.id = '6'

            var n = 4
            while(n >= 0)
            {
                const t = document.getElementById(`${n}`)
                t.className = `AlbumFrame ${tmp[n + 1]}`
                t.style = `margin-right: ${tmpM[n + 1]}vw; width: ${tmpWH[n + 1]}vw; height: ${tmpWH[n + 1]}vw; z-index: ${n+1};`
                t.id = `${n+1}`
                t.firstChild.style = `box-shadow: 0px 0px 50px ${this.state.ShowAlbum[5].color}`
                n--
            }

            const frame = document.createElement('div')
            frame.className = 'AlbumFrame one'
            frame.id = '0'
            frame.style = `margin-right: ${tmpM[0]}vw; width: ${tmpWH[0]}vw; height: ${tmpWH[0]}vw; z-index: 0;`

            const Album = document.createElement('img')
            Album.onclick = this.AlbumClick.bind(this)
            Album.className = `Album`
            Album.src = this.state.ShowAlbum[0].imgUrl

            frame.append(Album)
            document.getElementsByClassName('AlbumCovers')[0].append(frame)

            const bg = document.getElementById('bg')
            bg.style = `background-color: ${this.state.ShowAlbum[5].color}`

            document.getElementsByClassName('AlbumYear')[0].innerHTML = `${this.state.ShowAlbum[5].year}`
            document.getElementsByClassName('AlbumTitle')[0].innerHTML = `${this.state.ShowAlbum[5].name}`
            document.getElementsByClassName('AlbumSubTitle')[0].innerHTML = `${this.state.ShowAlbum[5].subtitle}`

            if(this.state.ShowAlbum[5].black)
            {
                document.getElementsByClassName('AlbumYear')[0].className += ' black'
                document.getElementsByClassName('AlbumTitle')[0].className += ' black'
                document.getElementsByClassName('AlbumSubTitle')[0].className += ' black'
                document.getElementsByClassName('AlbumLink')[0].className += ' black'
                document.getElementsByClassName('Albums')[0].className += ' black'
            }
            else
            {
                document.getElementsByClassName('AlbumYear')[0].className = 'AlbumYear'
                document.getElementsByClassName('AlbumTitle')[0].className = 'AlbumTitle'
                document.getElementsByClassName('AlbumSubTitle')[0].className = 'AlbumSubTitle'
                document.getElementsByClassName('AlbumLink')[0].className = 'AlbumLink'
                document.getElementsByClassName('Albums')[0].className = 'Albums item--show'
            }

            const trackM = document.getElementsByClassName('Songs')[0]
            trackM.innerHTML = ''

            for(var s of this.state.ShowAlbum[5].track)
            {
                var song = document.createElement('div')
                song.className = 'Song'
                if(this.state.ShowAlbum[5].black)
                {
                    song.className += " black"
                }

                var songNum = document.createElement('div')
                songNum.className = 'SongNum'
                songNum.innerHTML = `${this.state.ShowAlbum[5].track.indexOf(s) + 1}`
                song.appendChild(songNum)

                var songTitle = document.createElement('div')
                songTitle.className = 'SongTitle'
                songTitle.innerHTML = `${s.title}`
                song.appendChild(songTitle)

                if(s.isTitle) 
                {
                    var isTitle = document.createElement('div')
                    isTitle.className = 'TitleSign'
                    isTitle.innerHTML = `TITLE`
                    song.appendChild(isTitle)
                }
                
                var songTime = document.createElement('div')
                songTime.className = 'SongTime'
                songTime.innerHTML = `${s.time}`
                song.appendChild(songTime)

                trackM.appendChild(song)
            }

            e++
            await timeout(100)
        }
    }

    TrackSetup() {
        var res = []
        this.state.ShowAlbum[5].track.map((song) => {
            res.push(
                <div className='Song'>
                    <div className='SongNum'>{this.state.ShowAlbum[5].track.indexOf(song) + 1}</div>
                    <div className='SongTitle'>{song.title}</div>
                    {
                        (song.isTitle) ? (
                            <>
                                <div className='TitleSign'>TITLE</div>
                            </>
                        ) : (
                            <>
                            </>
                        )
                    }
                    <div className='SongTime'>{song.time}</div>
                </div>
            )
        })
        return res
    }

    AlbumsSetup() {
        const tmpM = [40, 31, 25, 18, 10, 0]
        const tmpWH = [0, 10, 15, 20, 25, 30]
        const tmp = ['one', 'two', 'three', 'four', 'five', 'six']
        var res = []
        var a = 5
        while (a >= 0)
        {
            res.push(
                <div id={`${a}`} className={`AlbumFrame ${tmp[a]}`} style={{marginRight: `${tmpM[a]}vw`, height: `${tmpWH[a]}vw`, width: `${tmpWH[a]}vw`, zIndex: `${a}`}}>
                    <img onClick={this.AlbumClick.bind(this)} className={`Album`} src={this.state.ShowAlbum[a].imgUrl} style={{boxShadow: ` 0px 0px 50px ${this.state.ShowAlbum[5].color}`}} />
                </div>
            )
            a--
        }
        return res
    }

    render() {
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
                target.classList.remove("item--show");
            });
        })

        return  <div className="AlbumSectionContent" id='bg'>
            <Link to='/Albums'>
                <div ref={observe} className="Albums">Albums</div>
            </Link>
            <div className='AlbumGroup'>
                <div ref={observe} className='AlbumCovers'>
                    {
                        this.AlbumsSetup()
                    }
                </div>
                <div ref={observe} className='AlbumInfo'>
                    <div ref={observe} className='AlbumInfoGroup'>
                        <div>
                            <div className='AlbumYear'>{this.state.ShowAlbum[5].year}</div>
                            <div className='AlbumTitle'>{this.state.ShowAlbum[5].name}</div>
                            <div className='AlbumSubTitle'>{this.state.ShowAlbum[5].subtitle}</div>
                        </div>
                        <button onClick={() => window.location.href = `/Album/${this.state.ShowAlbum[5].name}`} className='AlbumLink'><ion-icon class='PlayIcon' name="play"></ion-icon></button>
                    </div>
                    <div ref={observe} className='Songs'>
                        {
                            this.TrackSetup()
                        }
                    </div>
                </div>
            </div>
        </div>
        
    }
}

export default Albums