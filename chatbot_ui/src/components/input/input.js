import "./input.css";

var input = (onchange, value, onkeydown) => {
    return(
        <div className = "custom_input_container">
            <input 
                className="custom_input"
                type="text" 
                name="my_message"
                onChange={onchange}
                value={value}
                onKeyDown={onkeydown}
            />
        </div>
    )
}

export default input;