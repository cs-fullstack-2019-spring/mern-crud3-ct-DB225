import React, {Component} from 'react'; // Base Component parent class we will extend
import "bootstrap/dist/css/bootstrap.min.css" // Optional Bootstrap CSS to gussy things up a bit
import {Redirect} from "react-router-dom"; // Redirect component to allow us to easily redirect to a different component/page


export default class CreateRsvp extends Component {
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
        Construct the Create RSVP screen component
        We need to keep up with 2 properties that match to our data model: person invited and if they responded.
        We also keep up with a flag to know when we have submitted create request so we can return to home page.
     */
    constructor(props) {
        super(props);

        this.onChangeRSVPPerson = this.onChangeRSVPPerson.bind(this);
        this.onChangeRSVPGoing = this.onChangeRSVPGoing.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.targetHomePage = this.targetHomePage.bind(this);

        this.state = {
            rsvp_person: '',
            rsvp_going: false,
            toHomePage: false,
        };
    }

    /**************************************************************************************
     * EVENT HANDLERS
     *
     * We need to implement the event handlers for each component that will be bound to the component state.
     * These implementations will match up with the binds we did in the constructor.
     *
     **************************************************************************************/

    // This handler will be called any time we type in the Person field
    onChangeRSVPPerson(e) {
        this.setState({
            rsvp_person: e.target.value
        })
    }

    // This handler will be called any time we change the 'Going?' field
    onChangeRSVPGoing(e) {
        this.setState({
            rsvp_going: e.target.value
        });
        console.log(this.state.rsvp_going);
    }


    // This handler will be called when the form is submitted
    onSubmit(e) {
        e.preventDefault();
        console.log('Form Submitted!');
        console.log(`RSVP Person: ${this.state.rsvp_person}`);
        console.log(`RSVP Is Going: ${this.state.rsvp_going}`);

        // Since everything should be driven by the state, let's pull the current state values
        // which we will then send to update the original record.
        let data = {
            rsvp_person: this.state.rsvp_person,
            rsvp_going: this.state.rsvp_going
        };

        // Now we need to use Fetch to send an HTTP POST request to our backend web service which
        // will actually create a new record in our Mongo database.
        //
        // This uses 'Promises' thus all of the '.then' calls.
        // The next 'then' won't be executed unless the prior function executes successfully.
        //
        return fetch('/rsvp', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: "cors",
            body: JSON.stringify(data)
        })
            .then(res => res.text()) // OR res.json()
            .then(res => console.log(res))
            .then(() => {
                    this.targetHomePage(); // We use this flag in state to signal that edit done so we can be routed back to home page
                }
            );
    }

    // This method sets our 'Redirect' flag to true so on next render, we will be re-directed to another page
    targetHomePage() {
        this.setState({toHomePage: true})
    }

    /**************************************************************************************
     * RENDER CONTENT
     *
     * Render() returns whatever content the component needs to return to be displayed in the browser.
     * It is called when the component is loaded, and anytime the component's state is changed.
     *
     ***************************************************************************************/
    render() {
        // We do a special check here on the flag we set up in submit to see if we need to return to the Home Page
        // Note the use of Redirect component from 'react-redirect-dom'
        if (this.state.toHomePage === true) {
            return <Redirect to={'/'}/>
        }

        // Redirect to Home page flag wasn't set, so let's display the edit form
        // NOTE how all values are pulled from our component state and how the form (onsubmit)
        // and our 2 input fields are bound to our handler methods, thus we have CONTROLLED COMPONENTS.
        return (
            // Using CSS classNames from Bootstrap to make it prettier (https://getbootstrap.com/docs/4.3/components)
            // but the inputs are regular old form inputs so don't let CSS confuse you.
            <div style={{marginTop: 20}}>
                <h3>Create RSVP</h3>
                <form onSubmit={this.onSubmit}>
                    <div className={"form-group"}>
                        <label>Person Invited:</label>
                        <input type="text" className="form-control" value={this.state.rsvp_person}
                               onChange={this.onChangeRSVPPerson} required autoFocus/>
                    </div>
                    <div className={"form-group"}>
                        <label>
                            Has RSVPed?
                        </label>
                        <select value={this.state.rsvp_going} onChange={this.onChangeRSVPGoing} className="form-control">
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <div className="btn-toolbar">
                        <div className="btn-group mr-2" role="group" aria-label="Basic example">
                            <input type="submit" value="Create RSVP" className="btn btn-success mr-2"/>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button className="btn btn-secondary mr-2" onClick={this.targetHomePage}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}
