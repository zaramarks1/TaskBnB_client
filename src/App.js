import './App.css';
import Main from './pages/Main';
import Navbar from './pages/Navbar';
import { createContext, useState, useEffect } from 'react';

// export const LoginContext = createContext();


function App() {
  
    const [loggedIn, setLoggedIn] = useState(
        localStorage.token ? true : false
    );

    function changeLoggedIn(value) {
        setLoggedIn(value);
        if (value === false) {
            localStorage.clear();
        }
  }
  return (
    <div className="App">
      <Navbar />
      <Main />
  </div>
  );
}


export default App;
