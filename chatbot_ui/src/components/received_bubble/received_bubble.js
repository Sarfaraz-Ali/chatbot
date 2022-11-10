import './received_bubble.css';

var received_bubble = (message) => {
    return (
        <div className="received_main">
            <div>{message}</div>
        </div>
    )
}

export default received_bubble;