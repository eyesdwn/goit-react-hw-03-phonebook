import React, { Component } from 'react';
import uuid from "uuid";
import ContactForm from "../ContactForm/ContactForm";
import Filter from "../Filter/Filter";
import ContactList from "../ContactList/ContactList";
import styles from "./App.module.css";


export default class App extends Component {
    state = {
      contacts: [
        {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
        {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
        {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
        {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
      ],
      filter: ''
    };

    filterContacts = (contacts, filter) => {
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()),
        );
    };

    changeFilter = e => {
        this.setState( { filter: e.target.value });
    };

    isAlreadyAdded = (contact, contacts) =>
       contacts.find(item =>
        item.name.toLowerCase().includes(contact.name.toLowerCase()),
    );

    addContact = contact => {
        const { contacts } = this.state;

        const contactToAdd = {
            ...contact,
            id: uuid(),
        };

        !this.isAlreadyAdded(contact, contacts) ?

        this.setState(state => ({
            contacts: [...state.contacts, contactToAdd],
        })) :
        alert(`${contact.name} is already added to the contact list`);
    };

    deleteContact = id => {
        this.setState(state => ({
            contacts: state.contacts.filter(contact => contact.id !== id),
        }));
    };

    componentDidMount() {
        const contacts = JSON.parse(localStorage.getItem("contacts")) || this.state.contacts;
        this.setState(state => ({
            contacts
        }));
    }
    componentDidUpdate(prevState) {
        const { contacts} = this.state;
        if (contacts !== prevState.contacts) {
            localStorage.setItem("contacts", JSON.stringify(contacts));
        }
    }

    render() {
        const {  filter, contacts } = this.state;
        const filteredContacts = this.filterContacts(contacts, filter);

        return (
          <div className={styles.app}>
            <h2>Phonebook</h2>
            <ContactForm onAddContact={this.addContact}/>
            {contacts.length > 0 && (
            <>
            <h2>Contacts</h2>
            {contacts.length >= 2 && (
            <Filter onChangeFilter={this.changeFilter}/>
            )}
            <ContactList contacts={filteredContacts} onDeleteContact={this.deleteContact}/>
            </>
            )}
          </div>
        );
    }
};