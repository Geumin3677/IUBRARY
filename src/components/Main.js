import Nav from "./Nav";
import Profile from "./Profile";
import Albums from "./Albums";
import Filmography from "./Filmography";
import React from 'react';

class Main extends React.Component {
    constructor(props) {
        super(props)
        
    }
    render () {
        return <div className="App">
            <Nav/>
            <div className="parent">
                    <Profile />
                    <Albums />
                    <Filmography />
                    <div className="bottom">
                        © 2022 IUBRARY. All Rights Reserved.<br></br>Made by ABELA With dlwlrma💜
                    </div>
            </div>
        </div>
    }
}

export default Main;