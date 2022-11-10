import './App.css';
import sent_bubble from './components/sent_bubble/sent_bubble';
import received_bubble from './components/received_bubble/received_bubble';
import input from './components/input/input';

function App() {
  return (
    <div className="App">
      {sent_bubble("Hello")}
      {received_bubble("Hi")}

      {input()}
    </div>
  );
}

export default App;
