import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
    return (
        <ul className={styles.list}>
            {contacts.map(({id, name, number}) => (
            <li key={id}>
              <button className={styles.button} type='button' onClick={() => onDeleteContact(id)}>Delete</button>
              {name}: {number}
            </li>
            ))}
        </ul>
    );
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }),
    ).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  };
  export default ContactList;