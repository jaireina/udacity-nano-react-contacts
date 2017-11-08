import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import ListContacts from './ListContacts.jsx';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount(){
    ContactsAPI
      .getAll()
      .then((contacts)=>{
        this.setState({contacts});
        console.log(contacts);
      });
  }

  deleteContact = (contact)=>{
    ContactsAPI
      .remove(contact)
      .then((contact)=>{
        this.setState( (currentState) => ({
          contacts: currentState.contacts.filter( c => c.id !== contact.id )
        }));
      });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <ListContacts 
            contacts={this.state.contacts} 
            onDeleteContact={this.deleteContact}
            onCreateContact={this.showCreateContact}
          />
        )} />
        
        <Route path="/create" component={CreateContact} />
      </div>
    );
  }
}

export default App;
