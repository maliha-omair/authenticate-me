
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from "./component/SignupFormPage"
import LoginFormPage from './component/LoginFormPage';
import Home from './component/Home'
import Logout from "./component/Logout";
import Navigation from "./component/Navigation";
import * as sessionActions from "./store/session";
import Profile from "./component/Profile";
import Footer from "./component/Footer";
import "./index.css"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      console.log("after refresh in app.js ");
      setIsLoaded(true);
    }).catch(()=>{
      setIsLoaded(true);
    });
    // setIsLoaded(true);
  }, [dispatch]);
  
  return (
   
      <div className="page-container">
        <div className = "content-wrap">
          <Navigation isLoaded={isLoaded}/>          
          {isLoaded && (
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
          )}
          
          <div>
          <Footer isLoaded={isLoaded} />
          </div>

        </div>
      </div>
    
  );
}

export default App;
