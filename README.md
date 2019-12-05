# Broadcaster--UI
broadcaster is web that enables  any/ every citizen to bring any form of corruption to the notice of appropriate authorities  and general public citizens also can report things that need government intervention 
  
[![Build Status](https://travis-ci.org/izabayogit/Broadcaster--UI.svg?branch=develope)](https://travis-ci.org/izabayogit/Broadcaster--UI)
[![Coverage Status](https://coveralls.io/repos/github/izabayogit/Broadcaster--UI/badge.svg?branch=develope)](https://coveralls.io/github/izabayogit/Broadcaster--UI?branch=develope)


## Getting Started

These are steps that should be followed by anyone who want toget a copy of project
The project is composed of two different sections:
- User Interface
- API

### Requirements
* User intrface
  - Any Web Browser (We recommend using Google Chrome)
  - Text Editor (VSCode is highly recommende)
  - User inteface login credential use any username and any password for both user and admin

* API Endpoints
  - Node JS
  - Postman

  ## Features
* User interface
Required Features
1. Users can create an account and log in.
2. Users can create a red-flag record (An incident linked to corruption).
3. Users can create an intervention record (a call for a government agency to intervene e.g
repair bad road sections, collapsed bridges, flooding e.t.c).
4. Users can edit their red-flag or intervention records.
5. Users can delete their red-flag or intervention records.
6. Users can add geolocation (Lat Long Coordinates) to their red-flag or intervention
records.
7. Users can change the geolocation (Lat Long Coordinates) attached to their red-flag or
intervention records.
8. Admin can change the status of a record to either under investigation, rejected (in the
event of a false claim) or resolved (in the event that the claim has been investigated and
resolved).

Optional Features
1. Users can add images to their red-flag or intervention records, to support their claims.
2. Users can add videos to their red-flag or intervention records, to support their claims.
3. Users can add label tags when creating red-flags or interventions to sub-group claims.
4. The application should display a Google Map with Marker showing the red-flag or
intervention location.


* API
1. POST /auth/signup
2. POST /auth/signin
3. GET /red-flags
4. GET /red-flags/<red-flag-id>
5. POST /red-flags
6. PATCH /red-flags/<red-flag-id>/location
7. PATCH /red-flags/<red-flag-id>/comment
8 DELETE /red-flags/<red-flag-id>


- use git bash:
 1.  First [download]( https://github.com/izabayogit/Broadcaster--UI.git) 
 2.  Install it
 3.  Clone it by running ` git clone https://github.com/izabayogit/Broadcaster--UI.git`
 4. Find the project directory from where you are tunning the git bash.

 ### Installing
1.For running the api
1.  First download and install [Node JS](https://nodejs.org/en/download/)
2.  Download and install [Postman](https://www.getpostman.com/downloads/)
3.  Clone the project
4.  Run `npm install` (`sudo apt install` for linux users) command for installing all project dependencies

## Running the tests
1. Open command prompt
2. navigate to the directory of cloned project
3. Run the automated test by running `npm run test` command

## Running the UI Template
- Just run `index.html` from the cloned project
- [OR simply use gh-page to run](https://izabayogit.github.io/Broadcaster--UI/UI)
## Running API
- [Heroku link](https://broadcaster2019.herokuapp.com)

## Used tools
* Server
  - Server side Framework: [Node JS](https://nodejs.org/)/[Express](https://expressjs.com/)
  - Linting Library: [ESLint](https://eslint.org)
  - Style Guide: [Airbnb](https://github.com/airbnb/javascript)
  - Testing Framework: [Mocha](https://mochajs.org/)


* User interface
  - CSS
  - HTML
  - JS

  
## Author
[IZABAYO Jonas](https://github.com/izabayogit)

## License
LICENCE - [LICENSE](LICENCE.md)


## Acknowledgments
- [Andela Kigali](https://andela.com/)