import logo from './logo.svg';
import './App.css';
import './write.css'
import './Landing.css'
import './Glass.css'
import './Button.css'
import './Checkout.css'
import './cart.css'
import './card.css'
import './navbar.css'
import './info.css'


import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Routes,
  NavLink
} from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Landing from './components/Landing';
import Interest from './components/Interest';
import Myinfo from './components/Myinfo';


function App() {
  return (
    <div className="App">


<div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >




      <Routes>


        <Route path="/" element={< Landing />} />
        <Route path="/home" element={< Home />} />
        <Route path="/sign" element={< Signup />} />
        <Route path="/interest" element={< Interest />} />
        <Route path="/myinfo" element={< Myinfo />} />



      </Routes>

    </div>
  );
}

export default App;
