import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    render() {
        return <div className="nav">
            <Link to="/">
                <div className="Logo">IUBRARY</div>
            </Link>
        </div>;
    }
}

export default Nav