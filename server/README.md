## Structure
/server.js is the main script of server.

/app/models/ defines the schemas.

/api/ is for requests routings.

### Routing for request of CRUD of user schema

/api/admin-router.js is for the routing for the CRUD of user schema.

|     Action    |           Path          | Method |          Request body field          |
|:-------------:|:-----------------------:|:------:|:------------------------------------:|
| Create user   | '/admin/user/create'    | POST   | Required: "username", "password"     |
| Retrieve user | '/admin/user/:userId'   | GET    |                                      |
| Update user   | '/admin/update/:userId' | POST   | At least one: "username", "password" |
| Delete user   | '/admin/delete/:userId' | POST   |                                      |

/api/admin-ctrl.js is the code of the CRUD of user schema.

### Routing for request of CRUD of location schema

/api/location-router.js is for the routing for the CRUD of location schema.

|       Action      |                 Path                 | Method |               Request body field              |
|:-----------------:|:------------------------------------:|:------:|:---------------------------------------------:|
| Create Location   | '/admin/location/create'             | POST   | Required: "name", "latitude", "longitude"     |
| Retrieve Location | '/admin/location/:locationId'        | GET    |                                               |
| Update Location   | '/admin/location/update/:locationId' | POST   | At least one: "name", "latitude", "longitude" |
| Delete Location   | '/admin/location/delete/:locationId' | POST   |                                               |

/api/location-ctrl.js is the code of the CRUD of location schema.

## TODO
Testings and debugings
