import './sent_bubble.css';

var sent_bubble = (message) => {
    return (
        <div className="sent_main">
            <div>{message}</div>
        </div>
    )
}

export default sent_bubble;