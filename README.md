** In development - please be aware there may be bugs!! **

The boilerplate structure is based off the tutorial used here:
https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/

and here:
https://medium.com/@dtkatz/use-the-blazing-fast-parcel-bundler-to-build-and-test-a-react-app-e6972a2587e1

This project installs Jest as well, but doesn't include any tests yet. Winston is installed with the Express server for better error messaging.
The client does not include Redux or other state management frameworks since React Hooks and Context allow some projects to forego that.

You must have Node and npm installed globally on your system. This project uses Node version 11.4.

To INSTALL the project:
navigate to project directory main folder where you can see the api and client folders. The Express server and React client files are separate repos within this project. They both must be running separately, at the same time.

command line:

$ cd api
$ npm install

$ cd client
$ npm install

(if you want to use prettier code formatter make sure the code below is in your package.json file. Use only on the client files package.json, not needed in API server.)

Put the following into your package.json (add format line to scripts if scripts parameter is already in there):
"scripts": {
"format": "prettier --write \"src/\*_/_.{js,jsx}\"",
},

## Development:

Parcel is used to host a client page server on localhost for development. It's easier and cleaner than using something like createreactapp. It's run as described below on the command line for the client.
The API server uses Node and Express, and is started the same way. It interacts with the backend, and gets and sends information to the API's created by Vdoit.

To RUN the project in development you must start the server AND the client in 2 terminal windows:

terminal 1:
cd api
npm run dev

terminal 2:
cd client
npm run dev

terminal 3:
Make sure you have git installed globally. Use this window for git pushes to bitbucket. Please create a new branch whenever editing, and push that branch. Repo Administrator will do the merge.
Handy cheat sheet: https://www.keycdn.com/blog/git-cheat-sheet#commands-for-git-branching

## Test: (no tests currently set up so will have errors)

npm run test

## Production:

Open a terminal window.
$ npm build.
$ ftp dist folder to server.
$ server folder: ../home/avp/avp-dev/frontend-avp-v2/client (or../home/avp/avp-prod/client)
$ ftp app.js and routes folder to ..../home/avp/avp-dev/frontend-avp-v2/api
$ ssh root@134.209.3.13
$ cd ../home/avp/avp-dev/frontend-avp-v2/client
$ pkill -f node
$ node server.js

2nd terminal window
$ ssh root@134.209.3.13
$ cd ../home/avp/avp-dev/frontend-avp-v2/api
npm start
