'use strict';

import { Contact } from './contact.js';
import { onEvent, select } from './utils.js';


const contacts = [];

function listContacts() {
  const contactOutput = select('#contact-output');
  contactOutput.innerHTML = ''; // Clear previous content

  contacts.forEach((contact) => {
    const contactCard = document.createElement('div');
    contactCard.classList.add('contact-card');

    const nameParagraph = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const emailParagraph = document.createElement('p');

    nameParagraph.textContent = `Name: ${contact.name}`;
    cityParagraph.textContent = `City: ${contact.city}`;
    emailParagraph.textContent = `Email: ${contact.email}`;

    contactCard.appendChild(nameParagraph);
    contactCard.appendChild(cityParagraph);
    contactCard.appendChild(emailParagraph);

    // delete the contact
    contactCard.onclick = () => deleteContact(contact);

    contactOutput.appendChild(contactCard);

  });

  // Display the number of contacts
  const countParagraph = document.createElement('p');
  countParagraph.textContent = `Total contacts: ${contacts.length}`;
  contactOutput.appendChild(countParagraph);
}

function addContact() {
    const contactInput = document.getElementById('contact-add');
    const validationMessage = document.getElementById('validation-message');
  
    const contactInfo = contactInput.value.split(',').map((info) => info.trim());
  
    // Validate input
    if (contactInfo.length !== 3) {
      validationMessage.textContent = 'Please enter name, city, and email separated by commas.';
      return;
    }
  
    const [name, city, email] = contactInfo;
  
    // Validate email format (you can add a more sophisticated email validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      validationMessage.textContent = 'Please enter a valid email address.';
      return;
    }
  
    // Clear message
    validationMessage.textContent = '';
  
    // add it to the beginning of the array
    const newContact = new Contact(name, city, email);
    contacts.unshift(newContact);
  
    // Clear the input field
    contactInput.value = '';
  
    listContacts();
  }

function deleteContact(contact) {
  const index = contacts.indexOf(contact);
  if (index !== -1) {
    contacts.splice(index, 1);
    listContacts();
  }
}

// Initial setup
document.getElementById('contact-button').addEventListener('click', addContact);

// Display existing contacts (if any)
listContacts();
