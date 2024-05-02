import React, { Component } from "react";
import ReactDOM from 'react-dom';

// membuat form firstname dan last name
class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      firstName: "",
      lastName: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.firstName + " " + this.state.lastName);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h2>Comment Form</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </label>
          
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </label>
         
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const element = document.getElementById('root');
const root = ReactDOM.createRoot(element)
root.render(<CommentItem />)

export default CommentItem;