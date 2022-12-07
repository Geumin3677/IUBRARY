import React from 'react';

class SongPlayer extends React.Component {
    componentDidMount = () => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            window.onYouTubeIframeAPIReady = this.loadVideo;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        window.YT.ready(this.loadVideo)
    };

    loadVideo = () => {
        const { vid } = this.props;

        this.player = new window.YT.Player(`player`, {
            videoId: vid,
            events: {
                onReady: this.onPlayerReady,
            },
        });
    };

    onPlayerReady = event => {
        event.target.playVideo();
    };

    onClick = () => {
        this.player.playVideo();
    }

    render() {
        return (
            <>
                <div id='player'></div>
                <button onClick={this.onClick.bind()}>asdf</button>
            </>
        )
    }
}

export default SongPlayer

