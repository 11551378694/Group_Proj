# CSCI2720 Group Project (have User system)

## Progress
### User action

 - [ ] List all places in a table, and allow sorting of the table with one of the listed fields, linking to single places
 - [ ] Show all places in a map, with links to each single place
 - [ ] Search for places which contain keywords in one field chosen by the user which will result in a table of place results
 - [ ] A separate view for one single place, containing:
	 - [ ] a map showing the place
	 - [ ] the place details
	 - [ ] user comments, where users can add new comments (non-threaded)
- [ ] Add place into a list of user’s favourite places, and see the list in another view
- [x] See the username in the top left/right of screen, and be able to log out

### Admin actions

 - [ ] Refresh data, i.e. reload from the online dataset, without affecting data which does not come from API (e.g. user comments within your app)
 - [ ] CRUD place data in the local database
 - [ ] CRUD user data (username and password only) in the local database
 - [ ] Log out as admin

### Non-user actions

 - [x] Log in as user with username and password
 - [x] Log in as admin using username and password both as admin

## User System

### How to use?

Please make sure that you are connecting to the CUHK VPN
1. Download the server folder
2. Unzip
3. run `npm install`
4. run `node server.js`

### How to update frontend?

1. Edit your code in the client folder
2. run `npm run build` for getting production
3. copy `client/build` content to `server/app/views`. Replace all files

` The database is connecting to 1155108980's database. It requires to reopen in sometimes. Please contact me if you want to use 1155108980's database.`

### Remark

The backend opens port 8080. Please don't change it at this moment because the frontend api is using `localhost:8080`
If you change it, it will display `Network Error`


## Structure
server folder for backend

client folder for frontend
