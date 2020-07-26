import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar.js';
import Input from '../Input/Input.js';
import Messages from "../Messages/Messages.js";

let socket; //create puplic variable, we will initialize it in the code later

function Chat({ location }) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);//Array of {user, text} objects
    const ENDPOINT = 'https://gt-chat.herokuapp.com/';//localhost:5000

    //It checks if there is new connection
    useEffect(() => {
        console.log("Loading chat data");
        const {name, room} = queryString.parse(location.search);
        setName(name);
        setRoom(room);

        socket = io(ENDPOINT);
        
        //Send event to server, trying to connect
        socket.emit('join', {name, room}, (error) => {
            if(error) {
                alert(error);
            }
        });

        //return () => {
            //socket.emit('disconnect'); //Say to server to call 'disconnect' event
            //socket.off();
        //};

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            //I cannot invent smth better to solve bugs in here
            const newArr = messages;
            newArr.push(message);
            setMessages(newArr);
        });
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, []);

    //function for sending messages
    const sendMessage = (event) => {
        event.preventDefault();//prevents default reloading of the page
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };

    //console.log(message, messages);
    //<InfoBar room={room}/>
    //<Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
    return (
        <div className='chat_container'>
            <div className="chat_innerContainer"> 
                <div className="chat_top">
                    <InfoBar room={room}/>
                </div>
                <div className="chat_middle">
                    <Messages messages={messages} name={name}/>
                </div>
                <div className="chat_bottom">
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                </div>
            </div>
        </div>
    );
}

export default Chat;