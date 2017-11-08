import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component{
	static propTypes = {
		contacts: PropTypes.array.isRequired,
		onDeleteContact: PropTypes.func.isRequired,
		onShowCreateContact: PropTypes.func.isRequired
	}

	state = {
		query: ''
	}

	updateQuery(query){
		this.setState({query});
	}

	clearQuery(){
		this.updateQuery('');
	}

	render(){
		let {contacts, onDeleteContact} = this.props;
		const {query} = this.state;
		let showingContacts = contacts;
		if(query){
			const match = new RegExp(escapeRegExp(query),'i');
			showingContacts = contacts.filter((c)=> match.test(c.name));
		}
		
		showingContacts.sort(sortBy('name'));

		return(
			<div className="list-contacts">
				<div className="list-contacts-top">
					<input 
						type="text" 
						className="search-contacts"
						placeholder="Search Contacts"
						value={this.state.query}
						onChange={(e)=>this.updateQuery(e.target.value)}/>

					<Link
						to="/create"
						className="add-contact"
						>Add Contact</Link>
				</div>
				
				{showingContacts.length !== contacts.length && (
					<div className="showing-contacts">
						<span>Now showing {showingContacts.length} of {contacts.length}</span>
						<button onClick={this.clearQuery}>Show All</button>
					</div>
				)}

				<ol className="contact-list">
					{showingContacts.map(contact => (
						<li key={contact.id} className="contact-list-item">
							<div className="contact-avatar" style={{backgroundImage: `url(${contact.avatarURL})`}}/>
							<div className="contact-details">
								<p>{contact.name}</p>
								<p>{contact.email}</p>
							</div>
							<button 
								className="contact-remove" 
								onClick={()=>onDeleteContact(contact)}>Remove</button>
						</li>
					))}
				</ol>
			</div>
		);
	}
}



export default ListContacts;