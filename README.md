# GPA Computer

Computes a user's grade-point average with three layers of input.

**[https://gpacomputer.web.app](https://gpacomputer.web.app)**

---

## Features

*Letter-to-number equivalent of grades is specific to a particular scale and is currently not directly customizable. This should be added in later updates.*

1. **Customization**: Create your own subjects, assign your own units and course names.
2. **Collapsible UI**: Divided based on terms, fill out each term. Computes a Final GPA based on them.

## Guide

1. [Open the Website](https://gpacomputer.web.app) or host it locally ([See Setup](##Setup)).

2. Work on inputting your marks on a specific term by either clicking on the dropdown button on the right or the plus button on the left (adds a course inside of it). This works the same for topics inside of subjects.

3. To edit headers, units, and percentages, simply double click on the text it's located at. Units and percentages that don't have a value won't have an effect on the numeric score or GPA since they need to be assigned one first. 

4. It's recommended to work on a field one at a time when adding a subject or topic. To delete any field, simply click on the minus button below the plus button. (You can also delete terms).

## Setup

Run the following commands:

`npm install`

`npm start`