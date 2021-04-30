## Structure
server.js is the main script of server.

models/model.js defines the schemas.

api/ is for all routings.

api/admin-router.js is for the routing for the CRUD of user schema.

|     Action    |           Path          |                                           Remarks                                         |
|:-------------:|:-----------------------:|:-----------------------------------------------------------------------------------------:|
| Create user   | '/admin/create'         | Both of the field of username and password should be included in the request body.        |
| Retrieve user | '/admin/user/:userId'   |                                                                                           |
| Update user   | '/admin/update/:userId' | At least one of the field of username or password should be included in the request body. |
| Delete user   | '/admin/delete/:userId' |                                                                                           |

api/admin-ctrl.js is the code of the CRUD of user schema.

## TODO
Location and destination routing and CRUD
