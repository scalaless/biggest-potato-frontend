import './App.css';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState("Hello world!")
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
