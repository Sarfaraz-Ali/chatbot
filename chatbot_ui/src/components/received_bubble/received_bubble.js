import './received_bubble.css';

var received_bubble = (message, key) => {
    return (
        <div className="received_main" key={key}>
            <div>{message}</div>
        </div>
    )
}

export default received_bubble;