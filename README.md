# CSCI2720 Group Project (have User system)

## Progress
### User action

 - [x] List all places in a table, and allow sorting of the table with one of the listed fields, linking to single places
 - [x] Show all places in a map, with links to each single place
 - [x] Search for places which contain keywords in one field chosen by the user which will result in a table of place results
 - [x] A separate view for one single place, containing:
	 - [x] a map showing the place
	 - [x] the place details
	 - [x] user comments, where users can add new comments (non-threaded)
- [ ] Add place into a list of user’s favourite places, and see the list in another view
- [x] See the username in the top left/right of screen, and be able to log out

### Admin actions

 - [x] Refresh data, i.e. reload from the online dataset, without affecting data which does not come from API (e.g. user comments within your app)
 - [x] CRUD place data in the local database
 - [x] CRUD user data (username and password only) in the local database
 - [x] Log out as admin

### Non-user actions

 - [x] Log in as user with username and password
 - [x] Log in as admin using username and password both as admin

## User System

### How to use?

Please make sure that you are connecting to the CUHK VPN
1. Download the server folder
2. Unzip
3. move to `server` folder
4. run `npm install`
5. run `node server.js`

### How to update frontend?

1. Edit your code in the client folder
2. run `npm install`
3. run `npm run build` for getting production
4. copy `client/build` content to `server/app/views`. Replace all files

` The database is connecting to 1155108980's database. It requires to reopen in sometimes. Please contact me if you want to use 1155108980's database.`

### Remark

The backend opens port 8080. Please don't change it at this moment because the frontend api is using `localhost:8080`
If you change it, it will display `Network Error`

#### Testing on VM

If you want to test the web application on your VM, please change the API_URL of files:
`client/src/services/auth.service.js`
`client/src/services/user.service.js`
Change from `http://localhost:8080/api/auth/` to `http://csci2720-g23.cse.cuhk.edu.hk/api/auth/`


## Structure
server folder for backend

client folder for frontend
