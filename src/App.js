import React, { Component } from 'react';
import *as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import './config/config';


class App extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      lists: []
    }
    this.ref = firebase.database().ref();
  }

componentDidMount() {
  this.getData();
}

getData = () => {
  this.ref.child('users').on('value', snapshot => {
    const obj = snapshot.val();
    const data = [];
    
    for(let key in obj) {
      data.push(obj[key]);
    }
    this.setState({
      lists: data
    })
  })
} 

  inputHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

saveData = () => {
   const id = firebase.database().ref().child('users').push().key;
  //  console.log(id)
    this.ref.child('users').child(id).set({
      name: this.state.name,
      email: this.state.email
    });
}


  render() {
    return (
      <div>

<div className="form">
  <div className="mdl-textfield mdl-js-textfield">
    <input className="mdl-textfield__input" type="text" id="name" onChange={this.inputHandler} />
    <label className="mdl-textfield__label" for="name">Name</label>
   </div>

<br />

  <div className="mdl-textfield mdl-js-textfield">
    <input className="mdl-textfield__input" type="text" id="email" onChange={this.inputHandler}/>
    <label className="mdl-textfield__label" for="email">Email</label>
  </div>

<br />

<button onClick={this.saveData} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
  <i class="material-icons">add</i>
</button>

</div>
<ul>
           {
             this.state.lists.map( (value,index) => {
                return(
                <li key="index">NAME: {value.name}, EMAIL: {value.email}`</li>
              )
       })
           }
    </ul>
      </div>
    );
  }
}

export default App;
