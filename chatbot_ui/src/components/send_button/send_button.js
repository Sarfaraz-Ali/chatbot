import "./send_button.css"
import send_image from "../../images/send.png"

var send_button = (onclick) => {
    return(
        <div className="custom_send_button">
                <img src={send_image} alt="" onClick={onclick}/>
        </div>
    )
}

export default send_button;