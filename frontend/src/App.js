import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Chatpage from "./Pages/ChatPage";
import "./app.css";

function App() {
    
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/chats" Component={Chatpage} />
      </Routes>
    </div>
  );
}

export default App;
