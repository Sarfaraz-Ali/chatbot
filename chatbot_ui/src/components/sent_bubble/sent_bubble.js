import './sent_bubble.css';

var sent_bubble = (message, key) => {
    return (
        <div className="sent_main" key={key}>
            <div>{message}</div>
        </div>
    )
}

export default sent_bubble;