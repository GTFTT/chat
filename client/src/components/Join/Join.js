import React, {useState} from 'react';
import joinStyle from "./Join.module.css";
import { Link } from 'react-router-dom';



function Join() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');


    return (
        <div className={joinStyle.container}>
            <input id="roomField" className={joinStyle.roomField} placeholder="Room" type="text"  onChange={event=>setName(event.target.value)}/>
            <input id="nameField" className={joinStyle.nameField} placeholder="Name" type="text"  onChange={event=>setRoom(event.target.value)}/>
            <Link className={joinStyle.btnLink} onClick={event => (!name || !room)? event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
                <button className={joinStyle.button} type="submit">Sign in</button>
            </Link>
        </div>
    );
}

export default Join;