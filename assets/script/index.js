'use strict';

import { Contact } from './contact.js';
import { onEvent, select, selectAll } from './utils.js';

// Global variables
const contacts = [];
const contactButton = select('#contact-button');
const contactOutput = select('#contact-output');
const validationMessage = select('#validation-message');
const contactInput = select('#contact-add');

// Variable Hoisting -- googled this again and looked over notes
let contactCard, nameParagraph, cityParagraph, emailParagraph, countParagraph, newContact, contactInfo, index;

function highlightNewestContact() {
  if (contacts.length > 0) {
    const newestContactCard = contactOutput.firstElementChild;
    if (newestContactCard) {
      newestContactCard.classList.add('newest-contact');

      const newestMessage = document.createElement('p');
      newestMessage.textContent = 'Newest contact added';
      newestMessage.style.color = '#9f0';
      contactOutput.insertBefore(newestMessage, newestContactCard);
    }
  }
}

function listContacts() {
  contactOutput.innerHTML = ''; 

  contacts.forEach((contact, i) => {
    contactCard = document.createElement('div');
    contactCard.classList.add('contact-card');

    nameParagraph = document.createElement('p');
    cityParagraph = document.createElement('p');
    emailParagraph = document.createElement('p');

    nameParagraph.textContent = `Name: ${contact.name}`;
    cityParagraph.textContent = `City: ${contact.city}`;
    emailParagraph.textContent = `Email: ${contact.email}`;

    contactCard.appendChild(nameParagraph);
    contactCard.appendChild(cityParagraph);
    contactCard.appendChild(emailParagraph);

    contactCard.onclick = () => deleteContact(contact);

    contactOutput.appendChild(contactCard);
  });

  countParagraph = document.createElement('p');
  countParagraph.textContent = `Total contacts: ${contacts.length}`;
  contactOutput.appendChild(countParagraph);

  highlightNewestContact();
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

function adjustLayout() {
    const contactCards = Array.from(selectAll('.contact-card'));
    contactCards.forEach((card, index) => {
      if ((index + 1) % 3 === 0) {
        card.classList.add('third-in-row');
      }
    });
  

function deleteContact(contact) {
  index = contacts.indexOf(contact);
  if (index !== -1) {
    contacts.splice(index, 1);
    listContacts();
  }
}

onEvent('click', contactButton, addContact);

listContacts();
