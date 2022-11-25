import React from 'react';
import FilmData from '../Filmography.json'

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

class Filmography extends React.Component {
    constructor(props) {
        super(props)
        this.state = {Films : [], ShowFilm : []}

        FilmData.Films.forEach(FilmData => {
            this.state.Films.unshift(FilmData)
        })

        var n = 0
        while(n < 6)
        {
            const Film = this.state.Films.pop()
            this.state.ShowFilm.unshift(Film)
            n++
        }
    }

    async FilmClick(a) {
        const tmpM = [14, 15, 16, 18, 21, 25]
        const tmpWH = [0, 5, 10, 14, 17, 22]
        const tmp = ['one', 'two', 'three', 'four', 'five', 'six']

        var pos = 5 - tmp.indexOf(a.target.parentNode.className.split(' ')[1])
        
        if(pos === 0) { pos = 1 }

        var e = 0
        while(e < pos)
        {

            this.state.Films.unshift(this.state.ShowFilm.pop())
            this.state.ShowFilm.unshift(this.state.Films.pop())

            const old = document.getElementById(`13`)
            if(old != null)
            {
                old.remove()
            }

            const top = document.getElementById(`12`)
            top.style = `margin-bottom: 20vw; opacity:0; visibility: hidden; z-index: 88; margin-right: 25vw; width: 27vw; height: 39vw;`
            top.id = '13'

            var n = 11
            while(n >= 7)
            {
                const t = document.getElementById(`${n}`)
                t.className = `FilmFrame ${tmp[n + 1 - 7]}`
                t.style = `margin-right: ${tmpM[n + 1 - 7]}vw; width: ${tmpWH[n + 1 - 7]}vw; height: ${tmpWH[n + 1 - 7] + 12}vw; z-index: ${n+1 - 7};`
                t.id = `${n+1}`
                t.firstChild.style = `box-shadow: 0px 0px 50px ${this.state.ShowFilm[5].color}`
                n--
            }

            const frame = document.createElement('div')
            frame.className = 'FilmFrame one'
            frame.id = '7'
            frame.style = `margin-right: ${tmpM[0]}vw; width: ${tmpWH[0]}vw; height: ${tmpWH[0] + 12}vw; z-index: 0;`

            const Film = document.createElement('img')
            Film.onclick = this.FilmClick.bind(this)
            Film.className = `Film`
            Film.src = this.state.ShowFilm[0].imgUrl

            frame.append(Film)
            document.getElementsByClassName('FilmCovers')[0].append(frame)

            const bg = document.getElementById('bg2')
            bg.style = `background-color: ${this.state.ShowFilm[5].color}`

            document.getElementsByClassName('FilmYear')[0].innerHTML = `${this.state.ShowFilm[5].year}`
            document.getElementsByClassName('FilmTitle')[0].innerHTML = `${this.state.ShowFilm[5].name}`
            document.getElementsByClassName('FilmSubTitle')[0].innerHTML = `${this.state.ShowFilm[5].role}`

            e++
            await timeout(100)
        }
    }

    FilmsSetup() {
        const tmpM = [14, 15, 16, 18, 21, 25]
        const tmpWH = [0, 5, 10, 14, 17, 22]
        const tmp = ['one', 'two', 'three', 'four', 'five', 'six']
        var res = []
        var a = 12
        while (a >= 7)
        {
            res.push(
                <div id={`${a}`} className={`FilmFrame ${tmp[a-7]}`} style={{marginRight: `${tmpM[a-7]}vw`, height: `${tmpWH[a-7] + 12}vw`, width: `${tmpWH[a-7]}vw`, zIndex: `${a-7}`}}>
                    <img onClick={this.FilmClick.bind(this)} className={`Film`} src={this.state.ShowFilm[a-7].imgUrl} style={{boxShadow: ` 0px 0px 50px ${this.state.ShowFilm[5].color}`}} />
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

        return  <div className="FilmSectionContent" id='bg2'>
            <div ref={observe} className="Films">Movie, Drama</div>
            <div className='AlbumGroup'>
                <div className='FilmInfo'>
                    <div ref={observe} className='FilmInfoGroup'>
                        <div>
                            <div className='FilmYear'>{this.state.ShowFilm[5].year}</div>
                            <div className='FilmTitle'>{this.state.ShowFilm[5].name}</div>
                            <div className='FilmSubTitle'>{this.state.ShowFilm[5].role}</div>
                        </div>
                    </div>
                </div>
                <div ref={observe} className='FilmCovers'>
                    {
                        this.FilmsSetup()
                    }
                </div>
            </div>
        </div>
        
    }
}

export default Filmography