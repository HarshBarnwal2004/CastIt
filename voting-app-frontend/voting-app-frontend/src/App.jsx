import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from './pages/AdminPanel';
import CandidateList from './components/CandidateList';
import UserProfile from './components/UserProfile';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/admin" component={AdminPanel} />
                    <Route path="/candidates" component={CandidateList} />
                    <Route path="/profile" component={UserProfile} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;