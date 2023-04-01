import { NAV } from "./nav.js"
import { Uniswap } from "../uniswap/Uniswap.js";
import { Body } from "../Market/body.js";
import Login from "../components/Login/index.jsx";
import Signup from "../components/register/index.jsx";
import Main from "../components/Main/index.jsx";
import{
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

export const Home = () => {
  const user = localStorage.getItem("token");
  return (
    <Router>
      <div className="Home">
        <NAV />
        <Routes>
          {user && <Route path="/" exact element={<Main />} />}
          <Route path="/uniswap" element= {<Uniswap />} ></Route>
          <Route path="/market" element= {<Body />} ></Route>
          <Route path="/login" exact element= {<Login />}></Route>
          <Route path="/register" exact element= {<Signup />}></Route>
        </Routes>
      </div>
    </Router>
  );
}