import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';


class SearchBar extends Component 
{
    constructor(props)
    {
        super(props);

        this.state = { term: ' ' };
        
        // This statement binds the "this" property to THIS component.  When we use a callback function like onInputChange
        // and we use the "this" keyword within that function
        // we need to bind that "this" property to this component
        // if not we will get an error because the "this" property that we are calling in our callback function
        // will not refer to this component.  It will refer to some mystery context that we cannot know.
        this.onInputChange = this.onInputChange.bind(this); 

    }

    onInputChange (event) // all of these "onchange, "onclick", "onscroll", etc come with this event parameter, this is vanilla javascript
    {
        console.log(event.target.value);
        this.setState( { term: event.target.value });
    }
 
    onFormSubmit(event)
    {
        // this call prevents our form element from submiting whenever user presses enter or submit button
        event.preventDefault(); 

        // We need to go and fetch weather data 
        this.props.fetchWeather(this.state.term);

    }

    render() 
    {
        return (

            // This form element is useful because it has built in functions such as allowing a user to press
            // enter to submit the form input data and press submit btn to submit too.  
            // But remember that if you have a form element focused and you
            // press enter it will refresh the browser because it is sending a post submit call to the server
            // below we stop this submit from happening with "onSubmit handler"
            <form onSubmit = { this.onFormSubmit } className = "input-group" > 

                <input 
                    placeholder = "Get a five-day forcast in your favorite cities" // this shit is the greyed out text in the input box
                    className = "form-control" // This className is what makes our form box stretch and fit with out button on the same row as it
                    value = { this.state.term }
                    onChange = { this.onInputChange } // This is an example of a callback function.
                />

                    <span className = "input-group-btn" >
                        <button type = "submit" className = "btn btn-secondary"> Submit </button>
                    </span>

            </form>
        );
    }


}



function mapDispatchToProps(dispatch)
{
    return bindActionCreators( { fetchWeather }, dispatch);  // bind our actionCreator to dispatch which is going to dispatch it to all reducers
}





// reason we are passing null below in the first argument as opposed to something like "mapStateToProps" or whatever
// is because whenever we connect mapDispatchToProps we have to have it as the second parameter in the connect function
// and since we dont care and arent mapping state to props we still need something in the first parameter of this connect call.
export default connect(null, mapDispatchToProps)(SearchBar);