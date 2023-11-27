## Contact Management App

## Overview
This project is a simple web application for managing contacts. Users can add, view, and delete contacts.

### Features
- Add new contacts with name, city, and email details
- View and delete existing contacts
- Highlights the newest added contact
- Responsive layout with a clean design

### Code examples
#### Importing/modules
```javascript
import { Contact } from './contact.js';
import { onEvent, select, selectAll } from './utils.js';
```
#### Validation:
Checks if the array `contactInfo `has exactly the three pieces of information (name, city, and email).
If not, it shows an error message.

```javascript
    if (contactInfo.length !== 3) {
        validationMessage.textContent = 'Please enter your name, city, and email separated by commas.';
        return; 
    }
```

#### Email Validation:
Uses email regex to check if the email has a valid format.
If not, it shows an error message.

```javascript
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        validationMessage.textContent = 'Please enter a valid email address.';
        return; 
    }
```

#### Validation Messages:
Clears existing validation/error messages.

```javascript
validationMessage.textContent = '';
```

 Click for [DEMO](https://mcguenette.github.io/contacts/)