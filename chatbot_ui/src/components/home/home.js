import { useState } from 'react';
import input from '../input/input';
import send_button from "../send_button/send_button";

import sent_bubble from "../sent_bubble/sent_bubble";
import received_bubble from "../received_bubble/received_bubble";

import "./home.css";

const Home = () => {
    const [mymessage, setMyMessage] = useState("")
    const [messages, setMessages] = useState([
        {
            "sent": "Hi"
        },
        {
            "received": "Hello"
        },
        {
            "sent": "whats up"
        },
        {
            "received": "nothing much"
        }
    ])
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
        if(e.key === "Enter"){
            console.log(e.key)
            onclick();
        }
    }

    var onclick = () => {
        console.log("ali");
        if (mymessage !== "") {
            var temp = messages.slice()
            temp.push({ "sent": mymessage });
            setMessages(temp)
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
                    {send_button(onclick)}
                </div>
            </div>
        </div>
    )
}

export default Home;