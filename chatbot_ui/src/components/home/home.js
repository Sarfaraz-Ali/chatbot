import { useState } from 'react';
import input from '../input/input';
import send_button from "../send_button/send_button";

import sent_bubble from "../sent_bubble/sent_bubble";
import received_bubble from "../received_bubble/received_bubble";

import axios from 'axios';

import "./home.css";
axios.defaults.withCredentials = true;
const Home = () => {
    const [mymessage, setMyMessage] = useState("")
    const [messages, setMessages] = useState([
        {
            "sent": "Hi"
        },
        {
            "received": "Hello"
        }
    ])

    var get_response = async (question) => {
        axios.post(`${process.env.REACT_APP_URL}chatbot/run/`, { 'message': question }).then((response) => {
            console.log(response)
            console.log("in get_response: ", messages);
            var temp = messages.slice()
            temp.push({ "received": response.data.answer });
            setMessages(temp)
        }).catch((err) => {
            console.log(err);
        })
    }

    var chat = () => {
        var arr = []
        var i = 0
        messages.map(element => {
            if (element.hasOwnProperty("sent")) {
                arr.push(sent_bubble(element['sent'], i++))
            } else {
                arr.push(received_bubble(element['received'], i++))
            }
        })
        return arr
    }

    var onchange = (e) => {
        var text = e.target.value
        setMyMessage(text);
    }

    var onkeydown = (e) => {
        if (e.key === "Enter") {
            console.log(e.key)
            enterClick();
        }
    }

    var enterClick = () => {
        if (mymessage !== "") {
            var temp = messages.slice()
            temp.push({ "sent": mymessage });
            setMessages(temp)
            console.log("in enterClick: ", messages);
            console.log("sent set")
            get_response(mymessage)
            console.log("received set")
        }
        setMyMessage("")
        console.log(messages)
    }
    return (
        <div className="home-root">
            <div className="home-chat-container">
                {chat()}
            </div>
            <div className="home-input-container">
                <div className="home-input">
                    {input((e) => onchange(e), mymessage, onkeydown)}
                </div>
                <div className="home-send-button">
                    {send_button(enterClick)}
                </div>
            </div>
        </div>
    )
}

export default Home;