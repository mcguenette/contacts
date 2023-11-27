'use strict';

import { Contact } from './contact.js';
import { onEvent, select, selectAll } from './utils.js';

const contacts = [];
const contactButton = select('#contact-button');
const contactOutput = select('#contact-output');
const validationMessage = select('#validation-message');
const contactInput = select('#contact-add');

// Learned this from our past classes - variable declaration in one line
let contactCard, nameInput, cityInput, emailInput, totalContacts, newContact, contactInfo, index;

function highlightContact() {
    const newestContactCard = contactOutput.firstElementChild;
    const newestMessageSection = select('.newest-contact-section');
    const newestMessage = select('#newest-contact-message');

    if (newestContactCard) {
        if (contacts.length > 0) {
            newestContactCard.classList.add('newest-contact');
            newestMessage.textContent = 'Newest contact added';
            newestMessageSection.style.display = 'block';
        } else {
            newestContactCard.classList.remove('newest-contact');
            newestMessage.textContent = '';
            newestMessageSection.style.display = 'none';
        }
    }
}


function createContactCard(contact) {
    const contactCard = document.createElement('div');
    contactCard.classList.add('contact-card');

    const nameInput = document.createElement('p');
    const cityInput = document.createElement('p');
    const emailInput = document.createElement('p');

    nameInput.textContent = `Name: ${contact.name}`; // will add the non appended names to html at a later date.
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
    const existingTotalContacts = select('.total-contacts');

    if (existingTotalContacts) {
        existingTotalContacts.textContent = `Total contacts: ${contacts.length}`;
    } else {
        const totalContacts = document.createElement('p');
        totalContacts.textContent = `Total contacts: ${contacts.length}`;
        totalContacts.classList.add('total-contacts');

        const validationSection = select('#validation-message').parentElement;
        validationSection.appendChild(totalContacts);
    }
}

function listContacts() {
    contactOutput.innerHTML = ''; 

    contacts.forEach((contact) => {
        const contactCard = createContactCard(contact);
        contactOutput.appendChild(contactCard);
    });

    updateTotalContacts();

    highlightContact();

}


function addContact() {
    contactInfo = contactInput.value.split(',').map((info) => info.trim());

    // Validation
    if (contactInfo.length !== 3) {
        validationMessage.textContent = 'Please enter your name, city, and email separated by commas.';
        return;
    }

    const [name, city, email] = contactInfo;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        validationMessage.textContent = 'Please enter a valid email address.';
        return;
    }
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

function onEnter(event) {
    if (event.key === 'Enter' || event.key === '\u000D') {
        event.preventDefault(); // Using this to prevent enter to refresh the page - default submit behaviour
        addContact();           // Wondering if changing the type instead would be best.
    }
}


onEvent('click', contactButton, addContact);
onEvent('keydown', contactInput, onEnter);

listContacts();
