import React from 'react';
import './Input.css';

//This takes three params and performs input and sending messages, it is pretty weird style like in OOP when components are independent
const InfoBar = ({message, setMessage, sendMessage}) => {
    return (
        <form className='input_form'>
            <input
                className="input_input"
                placeholder="Enter your text here..."
                value={message}
                onChange={event => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter'? sendMessage(event): null}
            />
            <button className="input_sendBtn" onClick={event => sendMessage(event)}>Send</button>
        </form>
    );
}

export default InfoBar;