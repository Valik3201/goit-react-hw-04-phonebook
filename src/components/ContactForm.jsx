import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import { ModalAlert } from './ModalAlert';

import { Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap';

/**
 * ContactForm component for adding new contacts.
 */
export class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      number: '',
      modalShow: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setModalShow = this.setModalShow.bind(this);
  }

  /**
   * Handle input change for name and number fields.
   * @param {Object} e - The event object.
   */
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Sets the state for displaying or hiding the modal.
   * @param {boolean} value - A flag indicating whether to show (true) or hide (false) the modal.
   * @param {string} name - The name of the contact to be displayed in the modal.
   */
  setModalShow = (value, name) => {
    // Set the new state with the provided values
    this.setState({ modalShow: value, name });
  };

  /**
   * Handle form submission for adding a new contact.
   * @param {Object} e - The event object.
   */
  handleFormSubmit(e) {
    e.preventDefault();

    const { name, number } = this.state;
    const { contacts, addContact } = this.props;

    if (contacts.some(contact => contact.name === name)) {
      this.setModalShow(true, name, number);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    addContact(newContact);

    this.setState({ name: '', number: '' });
  }

  render() {
    const { name, number, modalShow } = this.state;

    return (
      <>
        <Form onSubmit={this.handleFormSubmit} autoComplete="off">
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  autoComplete="off"
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                  placeholder="Name"
                  required
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Number"
                className="mb-3"
              >
                <Form.Control
                  type="tel"
                  name="number"
                  value={number}
                  onChange={this.handleChange}
                  autoComplete="off"
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                  placeholder="+48 123-456-789"
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="justify-content-end">
            <Col xs={12} lg={4}>
              <Button variant="primary" type="submit" className="w-100">
                Add Contact
              </Button>
            </Col>
          </Row>
        </Form>

        <ModalAlert
          show={modalShow}
          name={name}
          onHide={() => this.setModalShow(false, '')}
        />
      </>
    );
  }
}

// PropTypes
ContactForm.propTypes = {
  contacts: PropTypes.array.isRequired,
  addContact: PropTypes.func.isRequired,
};
