import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
// import App from './App';
import Login from './Components/Layout/Login'
import Signup from './Components/Layout/Signup'
import Dashboard from './Components/Layout/Dashboard'

const AppRouter = () => (
  <Router>
    <div>
    <Route exact path="/" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/dashboard" component={Dashboard} />
    </div>
  </Router>
);

export default AppRouter;
