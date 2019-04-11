import React, {Component} from 'react'; // Base Component parent class we will extend
import "bootstrap/dist/css/bootstrap.min.css" // Optional Bootstrap CSS to gussy things up a bit
import {Link} from "react-router-dom"; // The Link component lets us generate links (like 'url' in Django)

// We define this extra component for easy rendering of each RSVP line item we want to list
// on Home Page (see render down below). Note we generate a button link for edit and delete using Mongo DB record ids
const Rsvp = props => (
    // Using CSS buttons from Bootstrap to make it prettier (https://getbootstrap.com/docs/4.3/components)
    // but the inputs are regular old form inputs so don't let CSS confuse you.
    <tr>
        <td>{props.rsvp.rsvp_person}</td>
        <td className='tdcenter'>{props.rsvp.rsvp_going?'Yes':'No'}</td>
        <td className='tdcenter'>
            <Link to={"/edit/" + props.rsvp._id} className='btn btn-dark btn-sm modbutton'>Edit</Link> <Link to={"/delete/" + props.rsvp._id}  className='btn btn-dark btn-sm modbutton'>Delete</Link>
        </td>
    </tr>
);


/**************************************************************************************
 * COMPONENT CONSTRUCTOR
 * In your Constructor you need to:
 *   0. Call 'super' on base Component class 1st to let base class do its initial setup
 *
 *   1. Setup state variables for all controls in the form (the state will CONTROL the components)
 *   1A. Setup state variables for extras (flag to decide when to redirect back to home page in this case)
 *
 *   2. Bind 'this' to all onchange and submit event listener functions
 /**************************************************************************************/

/*
    Constructor for the List all RSVP screen component
    We need to keep up with just the list of RSVPs in an array.
*/
export default class ListRsvp extends Component {
    constructor(props) {
        super(props);
        this.state = {rsvps: []};
    }

    /**************************************************************************************
     * LIFECYCLE METHODS
     *
     * Lifecycle methods are provided by react to give us the option to do any setup b4
     * component render and/or any teardown/cleanup prior to our component being unloaded.
     *
     **************************************************************************************/

    // In our case, we need to go fetch the all the RSVPs from our Mongo DB
    // before we render the list of RSVPs.
    componentDidMount() {
        console.log("Refresh Data!");
        fetch('/rsvp')
            .then(data => data.json())
            .then(returnedData => this.setState({rsvps: returnedData}))

    }

    // Convenience method that we call to render our mini-RSVP components to build are table of RSVPs
    rsvpList() {
        return (
            this.state.rsvps && this.state.rsvps.map(function (currentRsvp, i) {
                return <Rsvp rsvp={currentRsvp} key={i}/>;
            }))
    }

    /**************************************************************************************
     * RENDER CONTENT
     *
     * Render() returns whatever content the component needs to return to be displayed in the browser.
     * It is called when the component is loaded, and anytime the component's state is changed.
     *
     ***************************************************************************************/
    render() {
        return (
            // Using CSS classNames from Bootstrap to make it prettier (https://getbootstrap.com/docs/4.3/components)
            // but the inputs are regular old form inputs so don't let CSS confuse you.
            <div>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th className='tdcenter'>Person Invited</th>
                        <th className='tdcenter'>Responded?</th>
                        <th className='tdcenter'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.rsvpList()}
                    </tbody>
                </table>
            </div>
        )
    }
}