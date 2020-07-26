import React from 'react';
import Emoji from 'react-emoji';
import './Message.css';

//This is message of the chat
const Message = ({message: {user, text}, name}) => {

    const trimmedName = name.trim().toLowerCase();
    let isSentByCurrentUser = (user === trimmedName);
    return (
        <div className={`message_container ${isSentByCurrentUser?"message_right":"message_left"}`}>
            <p className="message_userName">{user}</p>
            <div className="message_textBox">
                <p className="message_text">{Emoji.emojify(text)}</p>
            </div>
        </div>
    );
}

export default Message;