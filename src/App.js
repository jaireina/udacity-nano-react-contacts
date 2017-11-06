import React, { Component } from 'react';
import ListContacts from './ListContacts.jsx';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount(){
    console.log('mounted');
    ContactsAPI
      .getAll()
      .then((contacts)=>{
        this.setState({contacts});
        console.log(contacts);
      });
  }

  deleteContact = (contact)=>{
    this.setState( (currentState) => ({
      contacts: currentState.contacts.filter( c => c.id !== contact.id )
    }));
  }

  render() {
    return (
      <div>
        <ListContacts 
          contacts={this.state.contacts} 
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
