import React, { useContext } from 'react';
import { UserContext } from "../contexts/UserContext"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Dashboard from '../components/Dashboard'
import Home from './Home';
import Search from './Search';
import Profile from './Profile';
import Landing from './Landing';
import AddPet from './AddPet';
import NavBar from './Navbar';


const Routes = () => {
    const { logged, admin } = useContext(UserContext);

    return (
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <Landing />
                </Route>
                <Route exact path="/Home">
                    {logged ? <Home /> : <Redirect to="/" />}
                </Route>
                <Route path="/Profile">
                    <Profile />
                </Route>
                <Route path="/Search">
                    <Search />
                </Route>
                <Route path="/Dashboard">
                    {(logged && admin === 2) ? <Dashboard /> : <Redirect to="/" />}
                </Route>
                <Route path="/AddPet">
                    {(logged && admin === 2) ? <AddPet /> : <Redirect to="/" />}
                </Route>
            </Switch>
        </Router>
    )
}
export default Routes;