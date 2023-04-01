import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/register";
import Login from "./components/Login";
import { Home } from "./homepage/home.js"
import { Uniswap} from './uniswap/Uniswap.js'
import { Body } from './Market/body';

function App() {
  const user = localStorage.getItem("token");
  return (
    
    <div className="App">
      
      <Home />
    </div>
  );
}

export default App;
