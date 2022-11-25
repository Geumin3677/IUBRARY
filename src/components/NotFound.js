import React from 'react';
import Nav from './Nav';

class NotFound extends React.Component {
    render() {
        return <>
            <div className='App'>
                <Nav />
                <div className="parent">
                    <div class="NotFoundBg">
                        <div className='NFCxt'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="700" viewBox="0 0 672.93 260.7">
                                <path class="pathNF" d="M326.2,216.17s-17.48,9.46-18.46,6.52,19.11-18.65,16.17-15.91-42.39,22.43-43.57,18.52,13.83-13.3,17.74-16.43,22.43-13.83,18.52-8.35c-5.52,7.21-120.2,58.54-131.91,43.93-3.91-6.26,4.12-12.4,20-24.1,19.83-14.61,73.57-36.26,78.26-32.35,2.29,1.91,3.23,3.65-34.43,20.35-82.96,36.78-151.43,46.42-171.78,46.42s-38.2-4.99-40.5-29.01c-2.74-28.57,61.19-75.42,154.79-127.81C289.74,42.7,445.84,6.83,498.86,3.6c90.96-5.54,172.08,3.62,172.08,22.79,0,13.7-48.94,28.09-177.46,67.7C361.16,134.86,2,258.7,2,258.7"/>
                            </svg>
                            <div className='NFText'>
                                <div className='NotFound'>404NotFound</div>
                                <div className='NotFoundT'>존재하지 않는 페이지 입니다.</div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </>
    }
}

export default NotFound