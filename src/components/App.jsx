import { Component } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * Main application component representing the Phonebook.
 */
export default class App extends Component {
  constructor(props) {
    super(props);

    /**
     * @type {Object}
     * @property {Array} contacts - Array containing the contacts.
     * @property {string} filter - The filter string for contact search.
     */
    this.state = {
      contacts: [],
      filter: '',
    };

    this.addContact = this.addContact.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleDeleteContact = this.handleDeleteContact.bind(this);
    this.handleUpdateContacts = this.handleUpdateContacts.bind(this);
  }

  /**
   * Lifecycle method called after the component is mounted.
   * Retrieves stored contacts from localStorage and updates the component state.
   */
  componentDidMount() {
    // Retrieve stored contacts from localStorage
    const storedContacts = localStorage.getItem('myPhonebook');

    // If data is found, parse it back into an array of objects and set it in the state
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  /**
   * Checks if two values are equal by comparing their JSON representations.
   *
   * @param {*} a - The first value to be compared.
   * @param {*} b - The second value to be compared.
   * @returns {boolean} - Returns true if the JSON representations of the values are equal, otherwise returns false.
   */
  equalsCheck = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  /**
   * Lifecycle method called after the component updates.
   * Saves the updated contacts data to localStorage when the state changes.
   *
   * @param {Object} prevProps - The previous props before the update.
   * @param {Object} prevState - The previous state before the update.
   */
  componentDidUpdate(_prevProps, prevState) {
    // Save data to localStorage when the contacts state changes
    if (!this.equalsCheck(prevState.contacts, this.state.contacts)) {
      localStorage.setItem('myPhonebook', JSON.stringify(this.state.contacts));
    }
  }

  /**
   * Add a new contact to the state.
   *
   * @param {Object} newContact - The new contact to be added.
   */
  addContact(newContact) {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  }

  /**
   * Handle changes in the filter input.
   *
   * @param {Object} e - The event object.
   */
  handleFilterChange(e) {
    this.setState({ filter: e.target.value.toLowerCase() });
  }

  /**
   * Handle the deletion of a contact.
   *
   * @param {string} contactId - The ID of the contact to be deleted.
   */
  handleDeleteContact(contactId) {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  }

  /**
   * Handle updating contacts in the state.
   *
   * @param {Array} updatedContacts - The updated array of contacts.
   */
  handleUpdateContacts(updatedContacts) {
    // Update the state with the new contacts array
    this.setState({ contacts: updatedContacts });
  }

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );

    return (
      <Container className="d-flex justify-content-center mt-5 mb-5">
        <Row className="justify-content-md-center">
          <Col>
            <h1>Phonebook</h1>

            <ContactForm
              addContact={this.addContact}
              contacts={this.state.contacts}
            />
            <h2 className="mt-3">Contacts</h2>
            <Filter value={filter} onChange={this.handleFilterChange} />
            <ContactList
              contacts={filteredContacts}
              onDeleteContact={this.handleDeleteContact}
              onUpdateContacts={this.handleUpdateContacts}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
