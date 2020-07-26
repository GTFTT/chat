import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Messages.css';
import Message from '../Message/Message.js';

//There will be rendered messages of the chat
//name - name of current user
const Messages = ({messages, name}) => {
    return (
        <ScrollToBottom className="messages_scroll">
            {messages.map((item, index) => (<div key={index}><Message message={item} name={name}/></div>))}
        </ScrollToBottom>
    );
}

export default Messages;