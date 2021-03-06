# Recyclopedia - Saving the World™
#####
[![Coverage Status](https://coveralls.io/repos/github/Pallasite/Recyclopedia/badge.svg?branch=Iteration-2-Dev)](https://coveralls.io/github/Pallasite/Recyclopedia?branch=Iteration-2-Dev)
#####
*a Software Engineering CS506 - Group Project*	
## Description
Recyclopedia is to be a platform for providing easy access to detailed information concerning whether or not certain items can be Recycled at specific locations. 

## Running Instructions 
### Frontend
To run the Ionic front end, Node.js must be installed. Install the LTS version, available at https://nodejs.org/en/. Then, once Node is installed (and assuming npm was installed with it), install the Ionic framework and install Cordova:

```
$ npm install -g ionic
$ npm install -g cordova
```

Once ionic is installed, change working directories into the repository root directory, and run

```
$ ionic serve
```
To start a development server. A browser window will be launched, but unless a database is running queries will not be functional. Howerver, site navigation and various buttons will be working.

If any errors occur the following may fix those errors:
```
$ npm i @ionic/app-scripts
```

### Backend
* Set up and activate a Python virtual environment using Python 3.5: https://www.pythonforbeginners.com/basics/how-to-use-python-virtualenv/
* From command line cd into Recyclopedia/recycle_backend/
Run:
```
$ pip install requirements.txt
$ python manage.py runserver
```

**Note: Both frontend and backend services should be run on the same computer**

