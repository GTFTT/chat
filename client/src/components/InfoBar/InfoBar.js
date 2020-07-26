import React from 'react';
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';
import './InfoBar.css';

//It takes one parameter - current room and builds info bar for chat component
const InfoBar = ({room}) => {
    return (
        <div className='infoBar_container'>
            <div className="infoBar_statusCont">
                <h3 className="infoBar_roomTxt">Room: {room}</h3>
                <img className="infoBar_onlineIcon" src={onlineIcon} alt="onlineIcon"/>
            </div>
            <div className="infoBar_leaveCont">
                <a href="/"><img className="infoBar_closeIcon" src={closeIcon} alt="closeIcon"/></a>
            </div>
        </div>
    );
}

export default InfoBar;