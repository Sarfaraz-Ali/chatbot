import { useState, useRef, useEffect } from 'react';
import input from '../input/input';
import send_button from "../send_button/send_button";

import sent_bubble from "../sent_bubble/sent_bubble";
import received_bubble from "../received_bubble/received_bubble";

import axios from 'axios';

import "./home.css";
axios.defaults.withCredentials = true;
const Home = () => {
    const [mymessage, setMyMessage] = useState("")
    const [messages, setMessages] = useState([])

    const myref = useRef(null)

    useEffect(() => {
        scrollToBottom()
    }, [messages, mymessage]);

    const scrollToBottom = () => {
        myref.current?.scrollIntoView({ behavior: "smooth" })
    }

    var get_response = (question, callback) => {
        axios.post(`${process.env.REACT_APP_URL}chatbot/run/`, { 'message': question }).then((response) => {
            console.log("response: ", response.data);
            callback(question, response.data.answer)
        }).catch((err) => {
            console.log(err);
            callback(null, null)
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
            enterClick();
        }
    }

    var updateMessages = (mymessage, newMessage) => {
        if (newMessage != null) {
            var temp = messages.slice()
            temp.push({ "sent": mymessage }, { "received": newMessage });
            setMessages(temp)
        }
    }

    var enterClick = () => {
        if (mymessage !== "") {
            get_response(mymessage, updateMessages)
        }
        setMyMessage("")
    }
    return (
        <div className="home-root">
            <div className="home-chat-container">
                {chat()}
                <div ref={myref}></div>
            </div>
            <div className="home-input-container">
                <div className="home-input">
                    {input((e) => onchange(e), mymessage, onkeydown, "Type your message")}
                </div>
                <div className="home-send-button">
                    {send_button(enterClick)}
                </div>
            </div>
        </div>
    )
}

export default Home;