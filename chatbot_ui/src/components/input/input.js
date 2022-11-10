import "./input.css";

var input = () => {
    return(
        <div className = "custom_input_container">
            <input 
                className="custom_input"
                type="text" 
                name="my_message" 
            />
        </div>
    )
}

export default input;