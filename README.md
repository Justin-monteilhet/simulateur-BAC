
# Simulateur BAC

A browser extension that allows french students to compute the points they already have for their final exam.

## This extension is exclusively made for french 13th grade students

### [Video Demo](https://www.youtube.com/watch?v=73UYbXuqvs4) 

## Installation


Download the project's files to your computer and open your web browser. Open the extension manager and toggle developper mode in order to be able to load a local extension. Once toggled, you will see a button ``load unpacked extension``. Click it and select the ``src`` folder from the files you just downloaded.
    
## Screenshots

![App Screenshot](https://iili.io/HNpLMTN.png)


## Developement process

At first, I wanted to make a big final project, like a video game or a deep learning model that I'd have trained myself and all kind of stuff. However, between school, sport, and my other activities, I quickly realized that I wouldn't have time to complete all these. SO when one of my friend suggested this web extension that would compute your grades, I was really into it as it was a short but cool project. Moreover, I never worked with the chrome API before so that would totally make me discover a new field of web programming.

Trying to learn the structure of a chrome extension  I was kind of lost at first between the background script (the one that runs independently from the front-end), the content script (the one that executes inside the webpage), and the popup script (that is just the JS file associated with your extension's popup). After experimenting, I figured out that I onyl needed a popup.js to render data on my popup, and a content.js to gather data from the webpage.

So here is a description of ever file in the project :

* ``manifest.json`` is the base file of your extension, telling your brwoser which API version you use, your extension's name, description, scripts, icons...
* ``popup.html/.css`` is the basic structure and styling of the popup, not much to say here.
* ``popup.js`` In order to render the data, you have to find it somewhere. This file injects ``content.js`` into the webpage and renders the popup with the collected data. It also allows to manage the little slider as well as the comment below. The first lines can seem cryptic, but it essentially checks if the extension is opened on the right webpage, and then injects the script inside.
* ``content.js`` This is the injected file. It parses the grade table on the parcoursup platform and matched each grade with its coefficient for the final grade, which can be found [here](https://www.education.gouv.fr/reussir-au-lycee/comment-calculer-votre-note-au-baccalaureat-325511). When the list is finished, the rows that hasn't been treated are considered as options, and get assigned a coefficient of 2.
* ``icnons`` is the folder containing the icons of the extension. The only one that gets used is the ``icon128.png``.