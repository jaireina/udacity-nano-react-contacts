import React, { Component } from 'react';
import ListContacts from './ListContacts.jsx';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {
  state = {
    screen:'list', //list,create
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

  showCreateContact = (screen="create")=>{
    this.setState({screen})
  }

  render() {
    return (
      <div className="app">
        
        {this.state.screen === 'list' && (
          <ListContacts 
            contacts={this.state.contacts} 
            onDeleteContact={this.deleteContact}
            onCreateContact={this.showCreateContact}
          />
        )}
        
        {this.state.screen === 'create' && (
          <CreateContact />
        )}

      </div>
    );
  }
}

export default App;
