'use strict';

import { Contact } from './contact.js';
import { onEvent, select } from './utils.js';

const contacts = [];
const contactButton = select('#contact-button');
const contactOutput = select('#contact-output');
const validationMessage = select('#validation-message');
const contactInput = select('#contact-add');

// 
let contactCard, nameInput, cityInput, emailInput, totalContacts, newContact, contactInfo, index;

function highlightNewestContact() {
  if (contacts.length > 0) {
    const newestContactCard = contactOutput.firstElementChild;
    if (newestContactCard) {
      newestContactCard.classList.add('newest-contact');

      const newestMessage = document.createElement('p');
      newestMessage.textContent = 'Newest contact added';
      contactOutput.insertBefore(newestMessage, newestContactCard);
    }
  }
}

function adjustLayout() {
  const contactCards = Array.from(document.querySelectorAll('.contact-card'));
  contactCards.forEach((card, index) => {
    if ((index + 1) % 3 === 0) {
      // Add a class to the third card in each row
      card.classList.add('third-in-row');
    }
  });
}

function createContactCard(contact) {
    const contactCard = document.createElement('div');
    contactCard.classList.add('contact-card');
  
    const nameInput = document.createElement('p');
    const cityInput = document.createElement('p');
    const emailInput = document.createElement('p');
  
    nameInput.textContent = `Name: ${contact.name}`;
    cityInput.textContent = `City: ${contact.city}`;
    emailInput.textContent = `Email: ${contact.email}`;
  
    contactCard.appendChild(nameInput);
    contactCard.appendChild(cityInput);
    contactCard.appendChild(emailInput);
  
    // delete the contact
    contactCard.onclick = () => deleteContact(contact);
  
    return contactCard;
  }
  
  function updateTotalContacts() {
    const existingTotalContacts = document.querySelector('.total-contacts');
    
    // If totalContacts already exists, update its text content
    if (existingTotalContacts) {
      existingTotalContacts.textContent = `Total contacts: ${contacts.length}`;
    } else {
      const totalContacts = document.createElement('p');
      totalContacts.textContent = `Total contacts: ${contacts.length}`;
      totalContacts.classList.add('total-contacts');
  
      // Assuming validation message is under the same container with the id 'validation-message'
      const validationSection = document.getElementById('validation-message').parentElement;
      validationSection.appendChild(totalContacts);
    }
  }
  
  
  
  function listContacts() {
    contactOutput.innerHTML = ''; // Clear previous content
  
    contacts.forEach((contact) => {
      const contactCard = createContactCard(contact);
      contactOutput.appendChild(contactCard);
    });
  
    updateTotalContacts();
  
    // Highlight the newest contact
    highlightNewestContact();
  
    // Adjust layout to have a maximum of three cards per row
    adjustLayout();
  }
  

function addContact() {
  contactInfo = contactInput.value.split(',').map((info) => info.trim());

  // Validation
  if (contactInfo.length !== 3) {
    validationMessage.textContent = 'Please enter name, city, and email separated by commas.';
    return;
  }

  const [name, city, email] = contactInfo;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    validationMessage.textContent = 'Please enter a valid email address.';
    return;
  }

  // Clear message
  validationMessage.textContent = '';

  newContact = new Contact(name, city, email);
  contacts.unshift(newContact);

  contactInput.value = '';

  listContacts();
}

function deleteContact(contact) {
  index = contacts.indexOf(contact);
  if (index !== -1) {
    contacts.splice(index, 1);
    listContacts();
  }
}

onEvent('click', contactButton, addContact);

listContacts();
