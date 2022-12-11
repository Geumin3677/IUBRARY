import React from 'react';
import './SongPlayer.css'

class SongPlayer extends React.Component {
    state = {
        Plbtn: 'play',
        cntT: 0,
        VidL: 0
    }

    componentDidMount = () => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            window.onYouTubeIframeAPIReady = this.loadVideo;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        else
        {
            window.YT.ready(this.loadVideo)
        }
        
    };
    

    loadVideo = () => {
        const { vid } = this.props;

        this.player = new window.YT.Player(`player`, {
            videoId: vid,
            playerVars: {
                loop: 1
            },
            events: {
                onReady: this.onPlayerReady,
                onStateChange: this.onStateChange,
            },
        });
    };

    onStateChange = e => {
        if(e.data === 1)
        {
            this.setState({ Plbtn: 'stop' })
        }
        if(e.data === 2)
        {
            this.setState({ Plbtn: 'play' })
        }
        if(e.data === 0)
        {
            this.player.seekTo(0, true)
        }
    }

    onPlayerReady = event => {
        this.setState({ VidL:  this.player.getDuration() })
        const inter = setInterval(() => {
            const t = this.player.getCurrentTime()
            this.setState({ cntT: t })

            const per = (t / this.state.VidL * 100) + 0.5

            const bar = document.getElementById('bar')
            if(bar === null)
            {
                clearInterval(inter)
            }
            bar.value = t
            bar.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${per}%, #ffffe180 ${per}%, #ffffe180 100%)`
        }, 50);
    };

    onPlayClick = () => {
        if(this.player.getPlayerState() === 1)
        {
           
            this.player.pauseVideo();
        }
        else
        {
            
            this.player.playVideo();
        }
    }

    onbarChange = e => {
        this.player.seekTo(e.target.value, true)
    }

    foward = () => {
        const ctime = this.player.getCurrentTime()
        this.player.seekTo(ctime + 10, true)
    }

    back = () => {
        const ctime = this.player.getCurrentTime()
        this.player.seekTo(ctime - 10, true)
    }

    render() {
        const { ABData } = this.props
        return (
            <>
                <div id='player'></div>
                <div classNam="controller">
                    <div className='bars'>
                        <input id='bar' type="range" min="0" max={this.state.VidL} onChange={this.onbarChange.bind(this)} />
                        <div className='timeInfo'>
                            <div id='Lt'>{new Date(this.state.cntT * 1000).toISOString().slice(14, 19)}</div>
                            <div id='Rt'>{new Date(this.state.VidL * 1000).toISOString().slice(14, 19)}</div>
                        </div>
                    </div>
                    <div className='Btns'>
                        <button className='Btn L' onClick={this.back.bind()}><ion-icon name="play-back"></ion-icon></button>
                        <button className='Btn C' onClick={this.onPlayClick.bind()}>{
                            (this.state.Plbtn === "play") ? (
                                <ion-icon name="play"></ion-icon>
                            ) : (
                                <ion-icon name="pause"></ion-icon>
                            )
                        }</button>
                        <button className='Btn R' onClick={this.foward.bind()}><ion-icon name="play-forward"></ion-icon></button>
                    </div>
                </div>
                
            </>
        )
    }
}

export default SongPlayer

/*
<input id='vol' type="range" min="0" max="100" onChange={this.onvolChange.bind(this)} />
                    <div>{this.state.vol}</div>
*/
