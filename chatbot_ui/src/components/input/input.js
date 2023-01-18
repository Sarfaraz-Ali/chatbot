import "./input.css";

var input = (onchange, value, onkeydown, placeholder) => {
    return(
        <div className = "custom_input_container">
            <input 
                className="custom_input"
                type="text" 
                name="my_message"
                onChange={onchange}
                value={value}
                onKeyDown={onkeydown}
                placeholder={placeholder}
            />
        </div>
    )
}

export default input;