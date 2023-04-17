import './App.css';
import Main from "./login_register/Main";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./login_register/register";
import Login from "./login_register/Login";
import { Home } from "./homepage/home.js"
import { Uniswap} from './uniswap/Uniswap.js'
import { Body } from './Market/body';
import EmailVerify from "./login_register/EmailVerify";
import ForgotPassword from "./login_register/ForgotPassword";
import PasswordReset from "./login_register/PasswordReset";

function App() {
  const user = localStorage.getItem("token");
  return (
          
    
    <div className="App">
      <Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
		</Routes>
      <Home />
    </div>
  );
}

export default App;
