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

  createContact = (contact)=>{
    ContactsAPI.create(contact)
      .then((newlyCreatedContact)=>{
        this.setState(state=>({
          contacts: state.contacts.concat([newlyCreatedContact])
        }))
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
        
        <Route path="/create" render={({history})=>(
          <CreateContact
            onCreateContact={(contact)=>{
              this.createContact(contact);
              history.push('/');
            }}

          />
        )} />
      </div>
    );
  }
}

export default App;
