import React, {Component} from 'react'; // Base Component parent class we will extend
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

// Import each component that we need to render
import CreateRsvp from './components/create-rsvp';
import DeleteRsvp from './components/delete-rsvp';
import EditRsvp from './components/edit-rsvp';
import ListRsvp from './components/list-rsvp';

class App extends Component {
    render() {
        return (
            // We use the great Router component to better organize our execution
            <Router>
                <div className="container">
                    {/*Using CSS classNames from Bootstrap to make it prettier (https://getbootstrap.com/docs/4.3/components)*/}
                    {/*but the inputs are regular old form inputs so don't let CSS confuse you.                    */}
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <Link to="/" className="navbar-brand">RSVPManager</Link>
                        <div>
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">RSVPs</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/create" className="nav-link">New RSVP</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    {/*We use Router in order to render the different components based on URL */}
                    {/*NOTE how route match patterns just like regular Express patterns*/}
                    <Route path="/" exact component={ListRsvp}/>
                    <Route path="/create" component={CreateRsvp}/>
                    <Route path="/edit/:id" component={EditRsvp}/>
                    <Route path="/delete/:id" component={DeleteRsvp}/>
                </div>
            </Router>
        );
    }
}

// We have to export a reference so it can be used in other places
export default App;